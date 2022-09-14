<!--
 * @Author: zhangxin
 * @Date: 2022-06-16 15:33:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-30 17:17:18
 * @Description: 
-->
<template>
    <div class="basin-byh">
        <ytxd-tabs
            class="basin-byh-tabs"
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
import { BasinjyhInstalls } from "./basin-byh-install";
import { useTabs } from "@/composables/useTabs";

import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { onMounted, onBeforeUnmount, unref } from "@vue/composition-api";

import useUserLayers from "@/biz/User/usecase/useUserLayers";
import { BeiyunBasinSymbolKey } from "@/biz/User/share/context";
import router from "@/router";

const tabDefault = "basic-data-byh";
const tabsMap = [
    {
        id: "basic-data-byh",
        label: "基础数据",
    },
    {
        id: "flood-plan-byh",
        label: "水库调度",
    },
    {
        id: "watershed-forecast-byh",
        label: "洪水预报",
    },
    {
        id: "hedging-transfer-byh",
        label: "避险转移",
    },
    {
        id: "model-calculation-byh",
        label: "模型计算",
        path: "/home/modules",
    },
];

const Power = ["model-calculation-byh"];

export default {
    name: "basin-byh",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { ...BasinjyhInstalls },
    props: {},
    setup() {
        const { mapview } = useMars3d();
        const { gather, setupLayer } = useLayer(mapview);
        const { beiyunBasinLayer } = useUserLayers();
        setupLayer(beiyunBasinLayer);

        onMounted(async () => {
            unref(mapview).flyToPoint([116.421501, 40.037104], {
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
            unref(gather)[BeiyunBasinSymbolKey].clear();
        });

        return {
            ...useTabs(tabsMap, tabDefault),
            beforeLeave,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./basin-byh.scss";
</style>