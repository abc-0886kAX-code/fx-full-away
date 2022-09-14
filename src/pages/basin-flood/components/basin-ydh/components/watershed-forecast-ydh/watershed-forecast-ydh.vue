<!--
 * @Author: zhangxin
 * @Date: 2022-06-15 13:16:09
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-22 16:17:30
 * @Description: 
-->
<template>
    <div class="watershed-forecast-ydh">
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
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { default as useCheckTree } from "@/composables/biz-tree/useCheckTree";
import { CheckTreeInstall } from "./components/install";
import SelectListData from "./api/select-list";

export default {
    name: "watershed-forecast-ydh",
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
@import "./watershed-forecast-ydh.scss";
</style>