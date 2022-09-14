<!--
 * @Author: maggot-code
 * @Date: 2022-05-19 17:18:41
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-15 13:12:34
 * @Description: file content
-->
<template>
    <div class="screen-grid-select-node" v-if="nodePower">
        <div class="screen-grid-select-node-alone" @click="handlerEvent(cell)" :style="style">
            <slot :cell="cell">
                <h1>{{ cell.label }}</h1>
            </slot>
        </div>

        <template v-if="hasChild">
            <template v-for="node in children">
                <screen-grid-select-node :key="node.id" :active="active" :cell="node" :children="node.children"
                    @toEvent="handlerEvent">
                    <template #default="{ cell }">
                        <slot :cell="cell" :activeNode="active"></slot>
                    </template>
                </screen-grid-select-node>
            </template>
        </template>
    </div>
</template>

<script>
import { cacheGet } from "maggot-utils";
import { isNil } from "lodash";
import { computed } from "@vue/composition-api";
import { useNodeStyle } from "@/biz/ScrrenGrid/usecase/useStyle";

export default {
    name: "screen-grid-select-node",
    mixins: [],
    components: {},
    props: {
        active: Object,
        cell: Object,
        children: {
            type: Array,
            default: () => [],
        },
    },
    emit: ["toEvent"],
    setup(props, context) {
        // 权限
        const nodePower = computed(() => {
            const { power } = props.cell;
            if (isNil(power)) return true;
            const cachePower = cacheGet("userlayers");
            const userPower = isNil(cachePower) ? 0 : +cachePower;

            return power.includes(userPower);
        });
        const { setupStyle } = useNodeStyle();
        const style = computed(() => setupStyle(props.cell, props.active));
        const hasChild = computed(() => props.children.length > 0);

        const handlerEvent = (cell) => {
            const { disabled } = cell;

            if (disabled) return;

            context.emit("toEvent", cell);
        };

        return {
            nodePower,
            style,
            hasChild,
            handlerEvent,
        };
    },
};
</script>
<style lang='scss' scoped>
.screen-grid-select-node {
    &-alone {
        user-select: none;
    }
}
</style>
