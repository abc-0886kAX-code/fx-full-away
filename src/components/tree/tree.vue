<!--
 * @Author: zhangyang
 * @Date: 2021-06-28 11:28:36
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-28 15:00:43
 * @Description: file content
-->
<template>
    <ul class="ytxd-tree">
        <ytxd-tree-cell
            v-for="node in treeNode"
            :key="node.key"
            :nodeProp="node"
            @change="handlerChange"
        >
            <template #children v-if="hasChildren(node)">
                <ytxd-tree
                    :treeNode="getChildren(node)"
                    :handlerChange="handlerChange"
                ></ytxd-tree>
            </template>
        </ytxd-tree-cell>
    </ul>
</template>

<script>
import YtxdTreeCell from "./tree-cell.vue";
export default {
    name: "ytxd-tree",
    mixins: [],
    components: { YtxdTreeCell },
    props: {
        treeNode: {
            type: Array,
            default: () => [],
        },
        handlerChange: {
            type: Function,
            default: () => {},
        },
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getChildren(node) {
            const { children } = node;

            return children;
        },
        hasChildren(node) {
            return this.getChildren(node).length > 0;
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./tree.scss";
</style>