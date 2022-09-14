<!--
 * @FilePath: \3D防汛作战\src\biz\Pickup\view\pick-list\pick-list.vue
 * @Author: zhangyang
 * @Date: 2022-06-16 16:27:41
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-16 17:45:40
 * @Description: 
-->
<template>
    <ul class='pick-list'>
        <template v-for="(node, index) in schemaInject">
            <pick-node :key="index" :node="node"></pick-node>
        </template>
    </ul>
</template>

<script>
import { default as PickNode } from "@/biz/Pickup/view/pick-node";

import {
    inject,
    unref,
    computed
} from "@vue/composition-api";
import { SchemaSymbolName } from "@/biz/Pickup/share/context";

export default {
    name: 'pick-list',
    mixins: [],
    components: {
        PickNode
    },
    props: {},
    setup() {
        const schemaInject = inject(SchemaSymbolName, []);

        return {
            schemaInject
        }
    }
};
</script>
<style lang='scss' scoped>
@import "./pick-list.scss";
</style>
