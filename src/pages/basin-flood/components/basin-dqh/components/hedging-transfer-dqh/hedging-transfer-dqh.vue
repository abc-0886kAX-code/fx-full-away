<!--
 * @Author: zhangxin
 * @Date: 2022-06-15 13:16:09
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-22 15:22:02
 * @Description: 
-->
<template>
    <div class="hedging-transfer-dqh">
        <el-tree
            class="tree-check"
            :data="treeMenu"
            :show-checkbox="true"
            :default-expand-all="true"
            :check-on-click-node="true"
            :expand-on-click-node="false"
            node-key="key"
            @check-change="handlerCheckChange"
        >
            <span class="el-tree-node__label" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <tree-legend :node="node" :data="data"></tree-legend>
            </span>
        </el-tree>

        <template v-for="tmp in treeDataSource">
            <component
                v-if="tmp.render"
                :key="tmp.key"
                :node="tmp"
                :is="tmp.componentName"
                :attr="tmp.props"
            ></component>
        </template>
    </div>
</template>

<script>
import { default as useCheckTree } from "@/composables/biz-tree/useCheckTree";
import { CheckTreeInstall } from "./components/install";

import SelectListData from "./api/select-list";

export default {
    name: "hedging-transfer-dqh",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {
        ...CheckTreeInstall,
    },
    props: {},
    setup() {
        const { treeDataSource, transformTree, treeAddNode, treeDelNode } =
            useCheckTree();

        function handlerCheckChange(node, status) {
            if (status) {
                treeAddNode(node);
            } else {
                treeDelNode(node);
            }
        }

        function setupLegendStyle(node, data) {
            const { childNodes } = node;

            if (childNodes.length > 0)
                return {
                    backgroundColor: "transparent",
                };

            const { legend } = data;
            return {
                backgroundColor: legend,
            };
        }

        return {
            treeDataSource,
            treeMenu: transformTree("cbr", SelectListData),
            handlerCheckChange,
            setupLegendStyle,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "@/assets/style/tree.scss";
@import "./hedging-transfer-dqh.scss";
</style>