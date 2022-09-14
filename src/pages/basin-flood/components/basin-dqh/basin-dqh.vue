<!--
 * @Author: zhangxin
 * @Date: 2022-06-16 15:33:12
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-23 10:12:14
 * @Description: 
-->
<template>
    <div class="basin-dqh">
        <ytxd-tabs
            class="basin-dqh-tabs"
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
import { BasinDqhInstalls } from "./basin-dqh-install";
import { useTabs } from "@/composables/useTabs";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { onMounted, onBeforeUnmount, unref } from "@vue/composition-api";

import useUserLayers from "@/biz/User/usecase/useUserLayers";
import useUserLocation from "@/biz/User/usecase/useUserLocation";
import { DaqingBasinSymbolKey } from "@/biz/User/share/context";
import router from "@/router";

const tabDefault = "basic-data-dqh";
const tabsMap = [
    {
        id: "basic-data-dqh",
        label: "基础数据",
    },
    {
        id: "flood-plan-dqh",
        label: "水库调度",
    },
    {
        id: "watershed-forecast-dqh",
        label: "洪水预报",
    },
    {
        id: "hedging-transfer-dqh",
        label: "避险转移",
    },
    {
        id: "model-calculation-dqh",
        label: "模型计算",
        path: "/home/modules",
    },
];

const Power = ["model-calculation-dqh"];

export default {
    name: "basin-dqh",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { ...BasinDqhInstalls },
    props: {},
    setup() {
        const { mapview } = useMars3d();
        const { gather, setupLayer } = useLayer(mapview);
        const { daqingBasinLayer } = useUserLayers();
        setupLayer(daqingBasinLayer);
        // const { setupMapviewLocation } = useUserLocation(mapview);

        onMounted(async () => {
            // setupMapviewLocation(DaqingBasinSymbolKey);
            unref(mapview).flyToPoint([115.876016, 39.742448], {
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

        onBeforeUnmount(() => {
            unref(gather)[DaqingBasinSymbolKey].clear();
        });

        return {
            ...useTabs(tabsMap, tabDefault),
            beforeLeave,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./basin-dqh.scss";
</style>
