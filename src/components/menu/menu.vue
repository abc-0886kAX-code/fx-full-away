<!--
 * @Author: zhangyang
 * @Date: 2021-05-12 09:20:58
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-30 11:53:47
 * @Description: file content
-->
<template>
    <el-menu class="ytxd-menu" mode="vertical" unique-opened :default-active="defaultActive" @select="routerSelect">
        <template v-for="cell in menuMap">
            <ytxd-menu-item v-if="renderSubmenu(cell)" :key="cell.name" :cell="cell"></ytxd-menu-item>

            <el-menu-item v-else :key="cell.name" :index="cell.name">
                <i :class="getIcon(cell)"></i>
                <span>{{ getTitle(cell) }}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script>
import MenuMixins from "@/mixins/menu.mixins";
import YtxdMenuItem from "./menu-item";
export default {
    name: "ytxd-menu",
    mixins: [MenuMixins],
    components: { YtxdMenuItem },
    props: {
        menuMap: {
            type: Array,
            default: () => [],
        },
        cutOff: {
            type: Number,
            default: () => 1,
        },
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        defaultActive() {
            const { name, meta } = this.$route;
            if (meta?.isFollow) return meta.followName;
            return name;
        },
        defaultOpeneds() {
            const { children } = this.$route;
            return children;
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        routerSelect(routeName) {
            const routeOptions = { name: routeName };

            this.$router.push(routeOptions);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./menu.scss";
</style>
