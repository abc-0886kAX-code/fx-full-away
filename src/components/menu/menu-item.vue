<!--
 * @Author: zhangyang
 * @Date: 2021-05-12 09:21:06
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-12 09:23:20
 * @Description: file content
-->
<template>
    <el-submenu :key="cell.name" :index="cell.name">
        <template slot="title">
            <i :class="getIcon(cell)"></i>
            <span>{{ getTitle(cell) }}</span>
        </template>

        <template v-for="item in cell.children">
            <ytxd-menu-item
                v-if="renderSubmenu(item)"
                :key="item.name"
                :cell="item"
            ></ytxd-menu-item>

            <el-menu-item v-else :key="item.name" :index="item.name">
                <i :class="getIcon(item)"></i>
                <span>{{ getTitle(item) }}</span>
            </el-menu-item>
        </template>
    </el-submenu>
</template>

<script>
import MenuMixins from "@/mixins/menu.mixins";
export default {
    name: "ytxd-menu-item",
    mixins: [MenuMixins],
    components: {},
    props: {
        cell: Object,
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
    methods: {},
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