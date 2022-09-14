<!--
 * @Author: zhangxin
 * @Date: 2022-06-16 15:33:12
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-23 10:12:14
 * @Description: 
-->
<template>
    <div class="basin-ydh">
        <ytxd-tabs
            class="basin-ydh-tabs"
            :active.sync="tabActive"
            :tabs="tabsMap"
            :intercept="true"
            @before-leave="beforeLeave"
        ></ytxd-tabs>
        <component :is="tabActive"></component>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { BasinYdhInstalls } from "./basin-ydh-install";
import { useTabs } from "@/composables/useTabs";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { onMounted, onBeforeUnmount, unref } from "@vue/composition-api";

import useUserLayers from "@/biz/User/usecase/useUserLayers";
import useUserLocation from "@/biz/User/usecase/useUserLocation";
import { YongdingBasinSymbolKey } from "@/biz/User/share/context";
import router from "@/router";

const tabDefault = "basic-data-ydh";
const tabsMap = [
    {
        id: "basic-data-ydh",
        label: "基础数据",
    },
    {
        id: "flood-plan-ydh",
        label: "水库调度",
    },
    {
        id: "watershed-forecast-ydh",
        label: "洪水预报",
    },
    {
        id: "hedging-transfer-ydh",
        label: "避险转移",
    },
    {
        id: "model-calculation-ydh",
        label: "模型计算",
        path: "/home/modules",
    },
];

const Power = ["model-calculation-ydh"];

export default {
    name: "basin-ydh",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { ...BasinYdhInstalls },
    props: {},
    setup() {
        // 引入3D地图
        const { mapview } = useMars3d();
        // 图层渲染
        const { gather, setupLayer } = useLayer(mapview);
        // 永定河流域图层
        const { yongdingBasinLayer } = useUserLayers();
        setupLayer(yongdingBasinLayer);
        // 定位地图中心坐标
        onMounted(async () => {
            unref(mapview).flyToPoint([115.882225, 40.114988], {
                radius: 200000,
            });
        });

        const beforeLeave = (options) => {
            const { reject, resolve, activeName } = options;
            Power.includes(activeName)
                ? handlerPower(activeName, reject)
                : resolve();
        };

        const handlerPower = (activeName, reject) => {
            const { path } = tabsMap.find((item) => item.id === activeName);
            const { href } = router.resolve(path);
            window.open(href);
            reject();
        };

        // 切换的时候清除地图图层
        onBeforeUnmount(() => {
            unref(gather)[YongdingBasinSymbolKey].clear();
        });
        // 遍历
        return {
            ...useTabs(tabsMap, tabDefault),
            beforeLeave,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./basin-ydh.scss";
</style>
