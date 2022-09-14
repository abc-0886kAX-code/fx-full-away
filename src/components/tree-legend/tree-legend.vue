<!--
 * @FilePath: \3D防汛作战\src\components\tree-legend\tree-legend.vue
 * @Author: zhangyang
 * @Date: 2022-06-22 13:43:13
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-22 14:14:43
 * @Description: 
-->
<template>
    <div v-if="useStyle" class='tree-legend tree-legend-color' :style="legendStyle"></div>
    <div v-else class="tree-legend tree-legend-image">
        <img class="tree-legend-image-body" :src="legendImage">
    </div>
</template>

<script>
import { computed } from "@vue/composition-api";

function hasChildren(node) {
    const { childNodes } = node;
    return childNodes.length > 0;
}

function setupLegendStyle({ node, data }) {
    if (hasChildren(node)) return {
        backgroundColor: "transparent",
    };

    const { legend } = data;
    return {
        backgroundColor: legend ?? "#fff",
    };
}

function setupLegendImage({ data }) {
    const { legend } = data;
    return legend;
}

export default {
    name: 'tree-legend',
    mixins: [],
    components: {},
    props: {
        node: Object,
        data: Object
    },
    setup(props) {
        const useStyle = computed(() => {
            if (hasChildren(props.node)) return true;

            return props.data.isColor;
        });

        const legendStyle = computed(() => setupLegendStyle(props));
        const legendImage = computed(() => setupLegendImage(props));

        return {
            useStyle,
            legendStyle,
            legendImage
        }
    }
};
</script>
<style lang='scss' scoped>
@import "./tree-legend.scss";
</style>
