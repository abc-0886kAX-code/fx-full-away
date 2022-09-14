<!--
 * @Author: maggot-code
 * @Date: 2022-05-23 14:12:10
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-14 17:08:26
 * @Description: file content
-->
<template>
    <play-slice-list class="radar-echo-map"></play-slice-list>
</template>

<script>
import store from "@/stroe";
import {
    computed,
    onBeforeUnmount,
    onMounted,
    unref,
    watch,
} from "@vue/composition-api";

import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useRadarEchoMap } from "@/biz/Mars3D/usecase/useRadarEchoMap";
import { usePlaySliceControl } from "@/biz/PlaySlice/usecase/usePlaySliceControl";
import { usePlaySliceData } from "@/biz/PlaySlice/usecase/usePlaySliceData";
import { usePlaySliceTime } from "@/biz/PlaySlice/usecase/usePlaySliceTime";
import { default as PlaySliceList } from "@/biz/PlaySlice/view/play-slice-list";
import useUserLocation from "@/biz/User/usecase/useUserLocation";

import { getRadarEchoMapData } from "@/pages/rainfall-forecast/api/prediction.api";

export default {
    name: "radar-echo-map",
    mixins: [],
    components: {
        PlaySliceList,
    },
    props: {},
    setup() {
        const { mapview } = useMars3d();
        const { resetMapviewLocation } = useUserLocation(mapview);
        const { clearRadarLayer, setupRadarLayer, findRadarLayer } =
            useRadarEchoMap(unref(mapview));

        const { setupData, clearData } = usePlaySliceData(false);
        const { clearPlayMonitor, usePlayMonitor } = usePlaySliceControl({
            type: "images",
            findLayer: findRadarLayer,
        });
        usePlaySliceTime();
        const params = computed(() => store.getters.queryParams);

        const executeQuery = async () => {
            clearRadarLayer();
            clearData();
            clearPlayMonitor();

            store.dispatch("_cancelTagRequest", "prediction");
            store.dispatch("_setupPlayLoad", true);
            const data = await setupData(() =>
                getRadarEchoMapData(unref(params))
            );
            const layers = setupRadarLayer(data);
            resetMapviewLocation();
            usePlayMonitor();
            return [layers, data];
        };

        watch(() => unref(params), executeQuery);
        onMounted(async () => {
            store.dispatch("_setupComponentName", "radar-echo-map-query");
        });

        onBeforeUnmount(() => {
            store.dispatch("_setupComponentName", "");
            clearRadarLayer();
            clearData();
            clearPlayMonitor();
        });

        return {};
    },
};
</script>
<style lang='scss' scoped>
@import "./radar-echo-map.scss";
</style>
