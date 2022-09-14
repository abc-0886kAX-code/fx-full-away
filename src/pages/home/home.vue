<!--
 * @FilePath: \fx-full-away\src\pages\home\home.vue
 * @Author: zhangxin
 * @Date: 2022-09-02 09:44:35
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-09-14 13:36:38
 * @Description: 
-->
<template>
    <ytxd-nav-layout class="ytxd-home" header-class="home-header">
        <template v-slot:logo>
            <ytxd-logo></ytxd-logo>
        </template>

        <template v-slot:control>
            <ytxd-user-controller></ytxd-user-controller>
        </template>
    </ytxd-nav-layout>
</template>

<script>
import YtxdNavLayout from "@/pages/layout/nav-layout";
import YtxdLogo from "@/components/logo";
// import YtxdNav from "@/components/nav";
import FxLogo from "@/components/fx-logo";
import YtxdUserController from "@/components/user-controller";
import { default as RouterMap } from "@/router/modules";

export default {
    name: "ytxd-home",
    mixins: [],
    components: { YtxdNavLayout, FxLogo, YtxdLogo, YtxdUserController },
    props: {},
    setup() {
        return {};
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        navMap() {
            return RouterMap.filter((router) => router.meta.isMenu);
        }
    },
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
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./home.scss";
</style>