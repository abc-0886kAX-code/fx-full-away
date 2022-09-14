<!--
 * @Author: zhangyang
 * @Date: 2021-05-11 16:26:44
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-19 15:49:53
 * @Description: file content
-->
<template>
    <div class="ytxd-menu-layout">
        <ytxd-menu class="ytxd-menu-aside" :menuMap="routerMap"></ytxd-menu>

        <main class="ytxd-menu-main">
            <transition name="el-fade-in-linear">
                <router-view />
            </transition>
        </main>
    </div>
</template>

<script>
import { arrayAs, deepRange } from "@/utils";
import YtxdMenu from "@/components/menu";
import { default as RouteMap } from '@/router/modules';
export default {
    name: "ytxd-menu-layout",
    mixins: [],
    components: { YtxdMenu },
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        routerMap() {
            const { matched } = this.$route;
            return this.setRouterMap(matched[1].name);
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        setRouterMap(name) {
            const router = deepRange(RouteMap, "children").filter((item) =>
                this.selectRouteName(item, name)
            );

            return arrayAs(router) && arrayAs(router[0].children)
                ? router[0].children
                : [];
        },
        selectRouteName(route, name) {
            const { name: baseName } = route;
            return baseName === name;
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
.ytxd-menu-layout {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;

    & .ytxd-menu-aside {
        width: 200px;
        height: auto;
        min-height: 100%;
        // background-image: linear-gradient(to right, #25afdf, #10244b);
        background-image: linear-gradient(to right, #25afdf, #2199c8);
        overflow-x: hidden;
        overflow-y: auto;
    }

    & .ytxd-menu-main {
        flex: 1;
        height: 100%;
        overflow: hidden;
    }
}
</style>