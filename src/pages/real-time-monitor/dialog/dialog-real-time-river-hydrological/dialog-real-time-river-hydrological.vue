<!--
 * @Author: zhangxin
 * @Date: 2022-05-23 15:19:51
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-06 15:34:24
 * @Description: 
-->
<template>
    <div class="dialog-real-time-river-hydrological">
        <ytxd-tabs :active.sync="tabActive" :tabs="tabsMap"></ytxd-tabs>
        <component
            :is="tabActive"
            :info="info"
            @loadStart="passonLoadStart"
            @loadEnd="passonLoadEnd"
        ></component>
    </div>
</template>

<script>
import { tabsInstall } from "./tabs/tabs-install";

import { useTabs } from "@/composables/useTabs";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";

const tabDefault = "tab-chart";
const tabsMap = [
    {
        id: "tab-chart",
        label: "数据图表",
    },

    {
        id: "tab-table",
        label: "数据表格",
    },
    {
        id: "tab-details",
        label: "站点信息",
    },
];
export default {
    name: "dialog-real-time-river-hydrological",
    //混入
    mixins: [DialogContentMixins],
    //import引入的组件需要注入到对象中才能使用
    components: {
        ...tabsInstall,
    },
    props: {},
    setup(props, context) {
        const passonLoadStart = () => context.emit("loadStart");
        const passonLoadEnd = () => context.emit("loadEnd");

        return {
            ...useTabs(tabsMap, tabDefault),
            passonLoadStart,
            passonLoadEnd,
        };
    },
};
</script>
<style lang='scss' scoped>
.dialog-real-time-river-hydrological {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>