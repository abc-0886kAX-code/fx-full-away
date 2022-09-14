<!--
 * @Author: maggot-code
 * @Date: 2022-05-23 14:13:59
 * @LastEditors: 120835827@qq.com 120835827@qq.com
 * @LastEditTime: 2022-07-22 16:27:39
 * @Description: file content
-->
<template>
  <div class="rainfall-pileup">
    <div class="rainfall-pileup-select">
      <el-date-picker
        v-model="dateVal"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>

      <el-button @click="executeQuery(params)" type="primary">查询</el-button>
      <el-button @click="reset" type="danger">重置</el-button>
    </div>

    <div class="rainfall-events-chart" v-loading="loading" v-bind="loadStyle">
      <charts-pages-layout
        :chartsRnder="RenderBarChart"
        :chartsOptions="chartsOptions"
        :isSelect="false"
      >
      </charts-pages-layout>
    </div>
  </div>
</template>

<script>
import { useSocketMessage, SOCKET_MESSAGE_PREDICTION } from "@/biz/Socket";
import {
  onMounted,
  ref,
  unref,
  computed,
  onBeforeUnmount,
  inject,
} from "@vue/composition-api";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { usePolygonGrid } from "@/biz/Mars3D/usecase/usePolygonGrid";
import useUserLocation from "@/biz/User/usecase/useUserLocation";
import {
  getRainfallPileupChartData,
  getRainfallPileupData,
} from "@/pages/rainfall-forecast/api/prediction.api";
import { handlerDatasetOptions } from "@/utils/handler-charts-options";
import ChartsPagesLayout from "@/components/charts-pages-layout";
import { RenderBarChart } from "@/plugins/charts";
import { Load } from "@/biz/share/entify/Load";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
const nowDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
const yesterDay = format(subDays(new Date(), 1), "yyyy-MM-dd HH:mm:ss");

const beasOptions = {
  grid: {
    top: "20%",
    left: "4%",
    right: "4%",
    bottom: "5%",
    containLabel: true,
  },
  toolbox: {
    top: "20",
    feature: {
      mark: {
        show: false,
      },
      dataView: {
        show: false,
        readOnly: false,
      },
      magicType: {
        show: false,
      },
      restore: {
        show: false,
      },
      saveAsImage: {
        show: false,
      },
    },
  },

  legend: {
    type: "scroll",
    width: 280,
    top: "0",
    data: ["实时数据", "预测数据"],
    textStyle: {
      color: "#fff",
    },
  },
  dataset: {
    dimensions: ["tm", "realTimeData", "forecastdata"],
    source: [],
  },
  xAxis: [
    {
      type: "category",
      axisLabel: {
        color: "#fff",
      },
    },
  ],
  dataZoom: [
    {
      start: 0,
      end: 100,
      zoomOnMouseWheel: true,
      type: "inside",
    },
    {
      type: "slider",
      start: 0,
      end: 100,
      show: false,
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "雨量(mm)",
      nameTextStyle: {
        padding: [0, 0, 0, -60], // 四个数字分别为上右下左与原位置距离
        color: "#fff",
      },
      axisLabel: {
        color: "#fff",
        formatter: "{value} mm",
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "实时数据",
      type: "bar",
      yAxisIndex: 0,
    },
    {
      name: "预测数据",
      type: "bar",
      yAxisIndex: 0,
    },
  ],
};

export default {
  name: "rainfall-pileup",
  mixins: [],
  components: { ChartsPagesLayout },
  props: {},
  setup() {
    const { setupSocketMessage } = useSocketMessage();
    const { loading, loadStyle, setupLoading } = Load();
    const { mapview } = useMars3d();
    const { resetMapviewLocation } = useUserLocation(mapview);
    const { setupShape } = usePolygonGrid(mapview);
    const { gather } = useLayer(mapview);
    const { find, clear } = unref(gather).HomeGeoJsonLayer;
    const layer = find();
    const dateVal = ref([yesterDay, nowDate]);
    const chartsOptions = ref({});
    const params = computed(() => ({
      st: unref(dateVal)[0],
      et: unref(dateVal)[1],
    }));

    const { setupLegend, setupLegendLoading, setupOptions, setupTagVisable } =
      inject("layerLegend");

    setupTagVisable();

    const executeQuery = async (params) => {
      setupLoading(true);

      const data = await getRainfallPileupChartData(params);
      chartsOptions.value = {
        ...handlerDatasetOptions(beasOptions, data),
      };
      setupLoading(false);
    };

    const queryLegend = async () => {
      clear();
      const result = await getRainfallPileupData();
      const shape = setupShape(result);
      layer.load(shape);
      resetMapviewLocation();
      setupLegend(result);
      setupLegendLoading(false);
    };

    const reset = async () => {
      dateVal.value = [yesterDay, nowDate];

      await executeQuery(unref(params));
    };

    setupSocketMessage(SOCKET_MESSAGE_PREDICTION, () => {
      executeQuery(unref(params));
      setupOptions(queryLegend);
      queryLegend();
    });
    onMounted(() => {
      executeQuery(unref(params));
      setupOptions(queryLegend);
      queryLegend();
    });

    onBeforeUnmount(() => {
      clear();
    });

    return {
      loading,
      loadStyle,
      dateVal,
      executeQuery,
      params,
      RenderBarChart,
      chartsOptions,
      reset,
    };
  },
};
</script>
<style lang='scss' scoped>
@import "./rainfall-pileup.scss";
</style>
