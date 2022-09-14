<!--
 * @Author: zhangxin
 * @Date: 2022-05-18 13:11:17
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-04 18:16:22
 * @Description: 
-->
<template>
  <mars3d-container class="ytxd-pages home-index" :config="config" :layers="layers" @onReady="handlerMapReady">
    <!-- 时间轴控制器 -->
    <play-slice-axis v-if="useAxis">
      <component :is="axisComponent"></component>
    </play-slice-axis>

    <legend-prediction v-if="isShowLegendPrediction"></legend-prediction>

    <!-- 等值面图/图例 -->
    <rainfall-legend class="rainfall-legend" v-if="LegendVisable" v-loading="LegendLoading" v-bind="gatherProps"
      @onReload="handlerRefresh"></rainfall-legend>

    <!-- modules -->
    <template v-for="(item, index) in modules">
      <container-layout v-if="item.length > 0" :position="setupModulesPosition(index)" :key="index" width="380px">
        <template v-for="mode in item">
          <component :key="mode.name" :is="mode.name" :class="mode.className" @onDialog="handlerClick"
            @onResolve="handlerResolve"></component>
        </template>
      </container-layout>
    </template>

    <ytxd-dialog :visable.sync="dialogVisable" :loading="dialogLoading" :title="dialogTitle" :width="dialogWidth"
      :height="dialogHeight">
      <component :key="dialogKey" :is="dialogName" :info="dialogProps" @loadStart="dialogLoadStart"
        @loadEnd="dialogLoadEnd" @closeDialog="dialogClose"></component>
    </ytxd-dialog>

    <ytxd-float-window :visable.sync="floatWindowVisible" v-bind="floatWindowBind"></ytxd-float-window>
  </mars3d-container>
</template>

<script>
import { useSocketClient } from "@/biz/Socket";
import { BJ_AREA_SERVICE } from "@/config/arcgis.conf";
import { default as setupMars3DConfig } from "@/config/mars3d.conf/index";
import store from "@/stroe";
import { computed } from "@vue/composition-api";
import { EventType } from "mars3d";

import useUserHomeModule from "@/biz/User/usecase/useUserHomeModule";
import useUserLayers from "@/biz/User/usecase/useUserLayers";
import useUserLocation from "@/biz/User/usecase/useUserLocation";
import useUserMask from "@/biz/User/usecase/useUserMask";

import { useMars3dEvent } from "@/biz/Mars3D/usecase/useMars3dEvent";
import { usePlaySliceAxis } from "@/biz/PlaySlice/usecase/usePlaySliceAxis";
import { useRevert } from "@/biz/ScrrenGrid/usecase/useRevert";
import { useDialog } from "@/composables/useDialog";
import { useFloatWindow } from "@/composables/useFloatWindow";

import { default as PlaySliceAxis } from "@/biz/PlaySlice/view/play-slice-axis";
import { default as RadarEchoMapQuery } from "@/pages/rainfall-forecast/components/radar-echo-map-query";
import { default as RainfallForecastQuery } from "@/pages/rainfall-forecast/components/rainfall-forecast-query";

import ContainerLayout from "@/layout/container";
import { default as LegendPrediction } from "@/pages/rainfall-forecast/components/rainfall-forecast-default-map/legend-prediction";
// 六大模块组件
import BusinessModules from "./business-module.json";
import BasinFlood from "../basin-flood";
import CityWaterlogging from "../city-waterlogging";
import DigitalTwin from "../digital-twin";
import FlashFloodDefense from "../flash-flood-defense";
import RainfallForecast from "../rainfall-forecast";
import RealTimeMonitor from "../real-time-monitor";
// 等值面图/图例
import { default as RainfallLegend } from "@/pages/rainfall-forecast/components/rainfall-legend";
// 所有点位弹框组件
import { dialogsInstall } from "./dialog-install";

import { useLayerLegendRender } from "@/composables/useLayerLegendRender";

// ICM模型 最不利
import { default as IcmModelMostUnfavorable } from "@/pages/basin-flood/components/basin-cbh/components/watershed-forecast-cbh/components/icm-model-most-unfavorable";

export default {
  name: "homeIndex",
  mixins: [],
  components: {
    LegendPrediction,
    ContainerLayout,
    RainfallForecast,
    RealTimeMonitor,
    DigitalTwin,
    FlashFloodDefense,
    BasinFlood,
    CityWaterlogging,
    PlaySliceAxis,
    RainfallForecastQuery,
    RadarEchoMapQuery,
    RainfallLegend,
    IcmModelMostUnfavorable,
    ...dialogsInstall,
  },
  props: {},
  setup() {
    useSocketClient({
      url: process.env.VUE_APP_SOCKET_URL,
    });
    const { modules, setupModulesPosition } =
      useUserHomeModule(BusinessModules);

    const { boundaryLayer } = useUserLayers();
    const { setupMaskToMapview } = useUserMask();

    const {
      gatherProps,
      handlerReload,
      LegendLoading,
      LegendVisable,
      setupLegendLoading,
      clearOptions,
      setupPerrVisable,
    } = useLayerLegendRender();

    const handlerRefresh = async () => {
      await handlerReload().finally(setupLegendLoading);
    };

    const isShowLegendPrediction = computed(() => store.getters.isActive);

    const dialog = useDialog();
    const float = useFloatWindow();
    const { useAxis, axisComponent } = usePlaySliceAxis();

    const { setupRevertMap } = useRevert();
    const handlerResolve = ({ type, pass }) => {
      const skip = pass ?? [];
      setupRevertMap([type, ...skip]);
      setupPerrVisable();
      clearOptions();
    };

    const handlerClickFilter = ["dialog-real-time-video-surveillance"];
    const handlerClick = (target) => {
      const { graphic } = target;
      const { attr: props, name: title } = graphic;
      const { dialogName: name, size } = props;

      if (handlerClickFilter.includes(name)) return;

      float.setupFloatHide();
      dialog.dialogHandler({ title, props, name, size });
    };
    const handlerOver = (target) => {
      const { graphic, startPosition } = target;
      float.setupFloatWindow({
        content: graphic.attr?.setupFloat(target),
        ...startPosition,
      });
    };

    const { setupBind } = useMars3dEvent({
      [EventType.click]: handlerClick,
      [EventType.mouseOver]: handlerOver,
      [EventType.mouseOut]: float.setupFloatHide,
    });

    const handlerMapReady = (mapview) => {
      const { resetMapviewLocation } = useUserLocation(mapview);

      setupMaskToMapview(mapview);
      resetMapviewLocation();

      const layer = mapview.getLayer("HomePointLayer", "name");
      setupBind(layer);
      setupBind(mapview.getLayer("FloodWarnPointLayer", "name"));
    };

    return {
      modules,
      setupModulesPosition,
      useAxis,
      axisComponent,
      config: setupMars3DConfig(3),
      layers: [
        {
          type: "graphic",
          name: "HomePointLayer",
          zIndex: 101,
        },
        {
          type: "geojson",
          name: "HomeGeoJsonLayer",
          zIndex: 101,
        },
        {
          type: "graphic",
          name: "FloodWarnPointLayer",
          zIndex: 101,
        },
        {
          type: "geojson",
          name: "FloodWarnGeoJsonLayer",
          zIndex: 101,
        },
        {
          type: "arcgis",
          name: "BJ_AREA_SERVICE",
          enablePickFeatures: false,
          url: BJ_AREA_SERVICE,
          zIndex: 101,
        },
        boundaryLayer,
      ],
      ...dialog,
      ...float,
      handlerResolve,
      handlerClick,
      handlerOver,
      handlerMapReady,
      isShowLegendPrediction,
      gatherProps,
      handlerRefresh,
      LegendLoading,
      LegendVisable,
    };
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./homeIndex.scss";

.rainfall-legend {
  width: 200px;
  background-image: linear-gradient(to bottom right, #0b133b, #1b2b9b, #4e5dc0);
  position: fixed;
  bottom: 15px;
  right: 470px;
  z-index: 201;
  // transform: translateX(-50%);
  font-size: 14px !important;
  height: auto;
  padding: 10px;
  border-radius: 10px;
  opacity: 0.9;
}
</style>
