<!--
 * @Author: zhangxin
 * @Date: 2022-06-28 13:45:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-18 10:10:58
 * @Description: 
-->
<template>
    <div class="city-waterlogging-sub-centre">
        <ytxd-tabs
            class="city-waterlogging-sub-centre-tabs"
            :active.sync="tabActive"
            :tabs="tabsMap"
        ></ytxd-tabs>
        <!-- <h1>{{ tabActive }}</h1> -->
        <ytxd-empty></ytxd-empty>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { useTabs } from "@/composables/useTabs";

const tabDefault = "basic-data-sub-centre";
const tabsMap = [
    {
        id: "basic-data-sub-centre",
        label: "基础数据",
    },
    {
        id: "waterlogging-forecast-sub-centre",
        label: "内涝预报",
    },
    {
        id: "Integrated-dispatching-sub-centre",
        label: "一体化调度",
    },
    {
        id: "risk-warning-sub-centre",
        label: "风险预警",
    },
];

export default {
    name: "city-waterlogging-sub-centre",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    setup() {
        return {
            ...useTabs(tabsMap, tabDefault),
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./city-waterlogging-sub-centre.scss";
</style>