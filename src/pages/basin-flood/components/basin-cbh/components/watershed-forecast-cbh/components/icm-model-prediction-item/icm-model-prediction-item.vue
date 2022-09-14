<!--
 * @Author: zhangxin
 * @Date: 2022-07-04 16:25:05
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-21 17:06:33
 * @Description: 
-->
<template>
    <div class="icm-model-prediction-item-item"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { icmQueryMapRenderData } from "@/api/icm/run.api";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { usePlaySliceControl } from "@/biz/PlaySlice/usecase/usePlaySliceControl";
import { usePlaySliceData } from "@/biz/PlaySlice/usecase/usePlaySliceData";
import { usePlaySliceTime } from "@/biz/PlaySlice/usecase/usePlaySliceTime";
import useUserLocation from "@/biz/User/usecase/useUserLocation";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { notifyE } from "@/plugins/element";
import store from "@/stroe";
import { onBeforeUnmount, onMounted, unref } from "@vue/composition-api";
import { useIcmModelMap } from "./useIcmModelMap";
import { useImgLayerRender } from "./useImgLayerRender";
export default {
    name: "icm-model-prediction-item",
    //混入
    mixins: [DialogContentMixins],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
        attr: {
            type: Object,
            default: () => {},
        },
    },
    setup(props, context) {
        const { mapview } = useMars3d();
        const { resetMapviewLocation } = useUserLocation(mapview);
        const {
            setupSimId,
            setupDuration,
            setupStep,
            setupResultsMultiplier,
            setupDurationUnit,
            executeQuery: executeArcgisQuery,
        } = useImgLayerRender();
        setupSimId(props.attr.id);
        store.dispatch("_setupModelSimid", props.attr.id);
        setupDurationUnit(props.attr.DurationUnit);
        setupDuration(props.attr.Duration);
        setupStep(props.attr.TimeStep);
        setupResultsMultiplier(props.attr.ResultsMultiplier);

        const { clearIcmLayer, setupIcmLayer, findIcmLayer } = useIcmModelMap(
            unref(mapview)
        );

        const { setupData, clearData } = usePlaySliceData(true); // false 进度条当前位置在最后，true 进度条当前位置在最前

        const { clearPlayMonitor, usePlayMonitor } = usePlaySliceControl({
            type: "images",
            findLayer: findIcmLayer,
        });
        usePlaySliceTime();

        const executeQuery = async () => {
            context.emit("loadStart");
            // 打断之前的请求
            store.dispatch("_cancelTagRequest", "mapRender");
            store.dispatch("_setupNotShowTime", true);
            store.dispatch("_setupPlayLoad", true);
            const code = await icmQueryMapRenderData({ simId: props.attr.id });
            // const code = 200;
            if (code === 200) {
                clearIcmLayer();
                clearData();
                clearPlayMonitor();
                const data = await setupData(() => executeArcgisQuery());
                const layers = setupIcmLayer(data);
                resetMapviewLocation();
                usePlayMonitor();
                context.emit("loadEnd");
                return [layers, data];
            }
            if (code === 300)
                notifyE("ICM模型模拟失败,请联系管理员!") &&
                    context.emit("loadEnd");
        };

        onMounted(() => {
            executeQuery();
            store.dispatch("_setupComponentName", "icm-model-most-unfavorable");
        });

        onBeforeUnmount(() => {
            store.dispatch("_cancelTagRequest", "mapRender");
            store.dispatch("_setupComponentName", "");
            clearIcmLayer();
            clearData();
            clearPlayMonitor();
        });

        return {};
    },
};
</script>
<style lang='scss' scoped>
</style>