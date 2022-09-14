<!--
 * @Author: zhangyang
 * @Date: 2021-05-11 17:10:59
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-18 15:34:59
 * @Description: file content
-->
<template>
    <el-menu
        class="ytxd-nav"
        mode="horizontal"
        unique-opened
        :default-active="defaultActive"
        :default-openeds="defaultOpeneds"
        @select="routerSelect"
    >
        <template v-for="cell in navMap">
            <template v-if="cell.children.length <= 1">
                <el-menu-item
                    :key="cell.children[0].name"
                    :index="cell.children[0].name"
                    :class="setActive(cell.children[0])"
                >
                    <!-- <i :class="getIcon(cell.children[0])"></i> -->
                    <span>{{ getTitle(cell.children[0]) }}</span>
                </el-menu-item>
            </template>

            <template v-else>
                <el-submenu
                    :key="cell.name"
                    :index="cell.name"
                    popper-class="second-nav"
                >
                    <template slot="title">
                        <!-- <i :class="getIcon(cell)"></i> -->
                        <span>{{ getTitle(cell) }}</span>
                    </template>
                    <template v-for="raw in cell.children">
                        <el-menu-item
                            :key="raw.name"
                            :index="raw.name"
                            :class="setActive(raw)"
                        >
                            <!-- <i :class="getIcon(raw)"></i> -->
                            <span>{{ getTitle(raw) }}</span>
                        </el-menu-item>
                    </template>
                </el-submenu>
            </template>
        </template>
    </el-menu>
</template>

<script>
import MenuMixins from "@/mixins/menu.mixins";
import { shortCacheSet } from "maggot-utils";

export default {
    name: "ytxd-nav",
    mixins: [MenuMixins],
    components: {},
    props: {
        navMap: {
            type: Array,
            default: () => [],
        },
        activeClass: {
            type: String,
            default: () => "",
        },
    },
    setup() {
        return {};
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        defaultActive() {
            const { name } = this.$route.matched[1];
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
            shortCacheSet("navName", routeName);
            this.$router.push({ name: routeName });
        },
        setActive(cell) {
            const { name } = cell;
            const { name: routerName } = this.$route;
            return name === routerName ? this.activeClass : "";
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
@import "./nav.scss";
.jhdhd {
    background-color: red;
}
</style>