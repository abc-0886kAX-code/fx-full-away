<!--
 * @Author: zhangxin
 * @Date: 2022-06-15 13:16:09
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-22 14:22:35
 * @Description: 
-->
<template>
    <div class="basic-data-ydh">
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
                :is="tmp.componentName"
                :node="tmp"
                :attr="tmp.props"
            >
            </component>
        </template>
    </div>
</template>

<script>
import { default as useCheckTree } from "@/composables/biz-tree/useCheckTree";

import { CheckTreeInstall } from "./components/install";

import SelectListData from "./api/select-list";
export default {
    name: "basic-data-ydh",
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

        return {
            treeDataSource,
            treeMenu: transformTree("cbr", SelectListData),
            handlerCheckChange,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "@/assets/style/tree.scss";
@import "./basic-data-ydh.scss";
</style>
