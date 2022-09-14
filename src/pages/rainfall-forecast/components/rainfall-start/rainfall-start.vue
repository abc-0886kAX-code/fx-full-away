<!--
 * @Author: maggot-code
 * @Date: 2022-05-23 14:14:17
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-14 17:04:54
 * @Description: file content
-->
<template>
    <rainfall-legend v-loading="loading" v-bind="loadStyle" class='rainfall-start' :info="legendProps"
        @onReload="handlerReload"></rainfall-legend>
</template>

<script>
import { useSocketMessage, SOCKET_MESSAGE_PREDICTION } from "@/biz/Socket";
import store from "@/stroe";
import { onMounted, onBeforeUnmount, unref } from "@vue/composition-api";

import { Load } from "@/biz/share/entify/Load";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { usePolygonGrid } from "@/biz/Mars3D/usecase/usePolygonGrid";
import useUserLocation from "@/biz/User/usecase/useUserLocation";

import { default as RainfallLegend, useLegend } from "../rainfall-legend";

import { getRainfallStartData } from "@/pages/rainfall-forecast/api/prediction.api";

export default {
    name: 'rainfall-start',
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
            const result = await getRainfallStartData();
            const shape = setupShape(result);
            layer.load(shape);
            resetMapviewLocation();
            setupLegend(result);
        }

        function handlerReload() {
            executeQuery().finally(setupLoading);
        }
        setupSocketMessage(SOCKET_MESSAGE_PREDICTION, handlerReload);
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
            handlerReload
        }
    }
};
</script>
<style lang='scss' scoped>
@import "./rainfall-start.scss";
</style>
