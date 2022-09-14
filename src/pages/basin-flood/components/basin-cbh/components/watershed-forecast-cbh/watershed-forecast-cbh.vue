<!--
 * @Author: zhangxin
 * @Date: 2022-06-15 13:16:09
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-06 15:57:30
 * @Description: 
-->
<template>
    <div class="watershed-forecast-cbh">
        <el-tree
            v-loading="loading"
            v-bind="loadStyle"
            class="tree-check"
            ref="WFRefs"
            :data="treeMenu"
            :show-checkbox="true"
            :default-expand-all="true"
            :check-on-click-node="true"
            :expand-on-click-node="false"
            node-key="signage"
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
                :key="tmp.signage"
                :node="tmp"
                :is="tmp.componentName"
                :attr="tmp.props"
                @loadStart="loadStart"
                @loadEnd="loadEnd"
            ></component>
        </template>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Load } from "@/biz/share/entify/Load";
import { default as useCheckTree } from "@/composables/biz-tree/useCheckTree";
import { computed, onMounted, ref, unref } from "@vue/composition-api";
import { CheckTreeInstall } from "./components/install";
import { useSelectList } from "./useSelectList";
export default {
    name: "watershed-forecast-cbh",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {
        ...CheckTreeInstall,
    },
    props: {},
    setup() {
        const WFRefs = ref();
        const list = ref([]);
        const { executeQuery } = useSelectList();
        const { treeDataSource, transformTree, treeAddNode, treeDelNode } =
            useCheckTree();
        const treeMenu = computed(() => {
            return transformTree("cbr", unref(list));
        });

        const { loading, loadStyle, setupLoading } = Load();

        function handlerCheckChange(node, status) {
            if (status) {
                treeAddNode(node);
                unref(WFRefs).setCheckedNodes([node]);
            } else {
                treeDelNode(node);
            }
        }

        const loadStart = () => {
            setupLoading(true);
        };

        const loadEnd = () => {
            setupLoading(false);
        };

        onMounted(async () => {
            setupLoading(true);
            const data = await executeQuery();
            list.value = data;
            setupLoading(false);
        });

        return {
            treeDataSource,
            treeMenu,
            handlerCheckChange,
            WFRefs,
            loading,
            loadStyle,
            loadStart,
            loadEnd,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "@/assets/style/tree.scss";
@import "./watershed-forecast-cbh.scss";
</style>