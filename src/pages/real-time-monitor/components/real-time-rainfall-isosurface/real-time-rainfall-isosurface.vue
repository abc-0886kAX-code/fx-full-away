<!--
 * @FilePath: \3D防汛作战\src\pages\real-time-monitor\components\real-time-rainfall-isosurface\real-time-rainfall-isosurface.vue
 * @Author: zhangyang
 * @Date: 2022-06-23 15:09:49
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-14 17:27:13
 * @Description: 
-->
<template>
    <rainfall-legend
        v-loading="loading"
        v-bind="loadStyle"
        class="real-time-rainfall-isosurface"
        :info="legendProps"
        @onReload="handlerReload"
    ></rainfall-legend>
</template>

<script>
import { useSocketMessage, SOCKET_MESSAGE_REALTIME } from "@/biz/Socket";
import store from "@/stroe";
import { onMounted, onBeforeUnmount, unref } from "@vue/composition-api";

import { Load } from "@/biz/share/entify/Load";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { usePolygonGrid } from "@/biz/Mars3D/usecase/usePolygonGrid";
import useUserLocation from "@/biz/User/usecase/useUserLocation";

import {
    default as RainfallLegend,
    useLegend,
} from "@/pages/rainfall-forecast/components/rainfall-legend";

import { getRealTimeRainfallIsosurfaceMap } from "@/pages/real-time-monitor/api/real-time-monitor.api";

export default {
    name: "real-time-rainfall-isosurface",
    mixins: [],
    components: { RainfallLegend },
    props: {},
    setup() {
        const { setupSocketMessage } = useSocketMessage();
        const { loading, loadStyle, setupLoading } = Load();
        const { mapview } = useMars3d();
        const { resetMapviewLocation } = useUserLocation(mapview);
        const { setupShape } = usePolygonGrid(mapview);
        const { legendProps, setupLegend } = useLegend();
        const { gather } = useLayer(mapview);
        const { find, clear } = unref(gather).HomeGeoJsonLayer;
        const layer = find();

        const executeQuery = async () => {
            clear();
            setupLoading(true);
            store.dispatch("_cancelTagRequest", "prediction");
            const result = await getRealTimeRainfallIsosurfaceMap();
            const shape = setupShape(result);
            layer.load(shape);
            resetMapviewLocation();
            setupLegend(result);
        };

        function handlerReload() {
            executeQuery().finally(setupLoading);
        }
        setupSocketMessage(SOCKET_MESSAGE_REALTIME, handlerReload);
        onMounted(() => {
            handlerReload();
        });

        onBeforeUnmount(() => {
            clear();
        });

        return {
            loading,
            loadStyle,
            legendProps,
            handlerReload,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./real-time-rainfall-isosurface.scss";
</style>
