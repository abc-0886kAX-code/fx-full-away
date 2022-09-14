<!--
 * @Author: maggot-code
 * @Date: 2022-05-26 18:14:49
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-05-27 17:45:23
 * @Description: file content
-->
<template>
    <div class="rainfall-legend-item">
        <span class="rainfall-legend-item-icon" :style="tagStyle"></span>
        <span class="rainfall-legend-item-text">{{ text }}</span>
    </div>
</template>

<script>
import { computed } from "@vue/composition-api";

export default {
    name: "rainfall-legend-item",
    mixins: [],
    components: {},
    props: {
        color: String,
        text: String,
    },
    setup(props) {
        const tagStyle = computed(() => ({
            backgroundColor: props.color,
        }));

        return {
            tagStyle,
        };
    },
};
</script>
<style lang='scss' scoped>
.rainfall-legend-item {
    display: flex;
    justify-content: space-between;
    height: 32px;
    padding: 0 8px;
    overflow: hidden;
    box-sizing: border-box;
    user-select: none;

    &-icon,
    &-text {
        align-self: center;
        display: block;
    }

    &-icon {
        width: 24px;
        height: 12px;
        border-radius: 6px;
        overflow: hidden;
    }

    &-text {
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        color: #eee;
    }
}
</style>