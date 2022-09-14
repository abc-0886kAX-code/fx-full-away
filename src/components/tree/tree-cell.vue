<!--
 * @Author: zhangyang
 * @Date: 2021-06-28 13:11:57
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-28 15:00:55
 * @Description: file content
-->
<template>
    <li class="ytxd-tree-cell" :key="nodeProp.key">
        <div class="ytxd-tree-context">
            <el-checkbox :value="nodeProp.status" @change="handlerStatus">{{
                nodeProp.label
            }}</el-checkbox>
        </div>

        <slot name="children"></slot>
    </li>
</template>

<script>
export default {
    name: "ytxd-tree-cell",
    mixins: [],
    components: {},
    props: {
        nodeProp: Object,
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
        handlerStatus(value) {
            const { key, children } = this.nodeProp;

            const hasChildren = children.length > 0;

            this.$emit("change", {
                key,
                value,
                hasChildren,
                node: this.nodeProp,
            });
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
<style lang='scss' scoped></style>