<!--
 * @Author: zhangxin
 * @Date: 2022-06-07 11:34:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-09 10:13:01
 * @Description: 
-->
<template>
    <div class="legend-prediction">
        <div class="legend-prediction-tag">
            <template v-for="(item, index) in tag">
                <rainfall-legend-item
                    :key="index"
                    :color="item.color"
                    :text="item.label"
                ></rainfall-legend-item>
            </template>
        </div>
    </div>
</template>

<script>
import { Load } from "@/biz/share/entify/Load";
import store from "@/stroe";
import { computed, watch } from "@vue/composition-api";
import { useLegend } from "../../rainfall-legend";
import { default as RainfallLegendItem } from "../../rainfall-legend/rainfall-legend-item.vue";

export default {
    name: "legend-prediction",
    mixins: [],
    components: { RainfallLegendItem },
    setup() {
        const legendData = computed(
            () => store.getters.getLegendPredictionData
        );
        const { loading, loadStyle, setupLoading } = Load();
        const { legendProps, setupLegend } = useLegend();

        const executeQuery = async () => {
            setupLegend(legendData.value);
        };

        const tag = computed(() => legendProps.value.color);

        function handlerReload() {
            executeQuery().finally(setupLoading);
        }

        watch(legendData, (newVal, oldVal) => {
            handlerReload();
        });

        return {
            loading,
            loadStyle,
            tag,
        };
    },
};
</script>
<style>
@import "./legend-prediction.scss";
</style>