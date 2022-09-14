<!--
 * @Author: zhangxin
 * @Date: 2022-06-16 15:33:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-04 15:14:32
 * @Description: 
-->
<template>
    <div class="basin-cbh">
        <ytxd-tabs
            class="basin-cbh-tabs"
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
import { BasinCBHInstalls } from "./basin-cbh-install";
import { useTabs } from "@/composables/useTabs";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { onMounted, onBeforeUnmount, unref } from "@vue/composition-api";

import useUserLayers from "@/biz/User/usecase/useUserLayers";
import { ChaobaiBasinSymbolKey } from "@/biz/User/share/context";
import router from "@/router";

const tabDefault = "basic-data-cbh";
const tabsMap = [
    {
        id: "basic-data-cbh",
        label: "基础数据",
    },
    {
        id: "flood-plan-cbh",
        label: "水库调度",
    },
    {
        id: "watershed-forecast-cbh",
        label: "洪水预报",
    },
    {
        id: "hedging-transfer-cbh",
        label: "避险转移",
    },
    {
        id: "model-calculation-cbh",
        label: "模型计算",
        path: "/home/modules",
    },
];

const Power = ["model-calculation-cbh"];

export default {
    name: "basin-cbh",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { ...BasinCBHInstalls },
    props: {},
    setup() {
        const { mapview } = useMars3d();
        const { gather, setupLayer } = useLayer(mapview);
        const { chaobaiBasinLayer } = useUserLayers();
        setupLayer(chaobaiBasinLayer);
        // const { setupMapviewLocation } = useUserLocation(mapview);

        onMounted(async () => {
            // setupMapviewLocation(ChaobaiBasinSymbolKey);
            unref(mapview).flyToPoint([116.739718, 40.607586], {
                radius: 300000,
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
            unref(gather)[ChaobaiBasinSymbolKey].clear();
        });

        return {
            ...useTabs(tabsMap, tabDefault),
            beforeLeave,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./basin-cbh.scss";
</style>
