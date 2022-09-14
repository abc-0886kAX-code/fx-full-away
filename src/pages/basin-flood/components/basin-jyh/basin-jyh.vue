<!--
 * @Author: zhangxin
 * @Date: 2022-06-16 15:33:12
 * @LastEditors: abc088_6kAX_code 86451477+abc-0886kAX-code@users.noreply.github.com
 * @LastEditTime: 2022-07-29 18:01:14
 * @Description: 
-->
<template>
  <div class="basin-jyh">
    <ytxd-tabs
      class="basin-jyh-tabs"
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
import { BasinjyhInstalls } from "./basin-jyh-install";
import { useTabs } from "@/composables/useTabs";

import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { onMounted, onBeforeUnmount, unref } from "@vue/composition-api";

import useUserLayers from "@/biz/User/usecase/useUserLayers";
import { JiyunBasinSymbolKey } from "@/biz/User/share/context";
import router from "@/router";

const tabDefault = "basic-data-jyh";
const tabsMap = [
  {
    id: "basic-data-jyh",
    label: "基础数据",
  },
  {
    id: "flood-plan-jyh",
    label: "水库调度",
  },
  //   {
  //     id: "watershed-forecast-jyh",
  //     label: "洪水预报",
  //   },
  {
    id: "hedging-transfer-jyh",
    label: "避险转移",
  },
  // {
  //     id: "model-calculation-jyh",
  //     label: "模型计算",
  //     path: "/home/modules",
  // },
];

const Power = ["model-calculation-jyh"];

export default {
  name: "basin-jyh",
  //混入
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: { ...BasinjyhInstalls },
  props: {},
  setup() {
    const { mapview } = useMars3d();
    const { gather, setupLayer } = useLayer(mapview);
    const { jiyunBasinLayer } = useUserLayers();
    setupLayer(jiyunBasinLayer);

    onMounted(async () => {
      unref(mapview).flyToPoint([117.08705, 40.210658], {
        radius: 200000,
      });
    });

    const beforeLeave = (options) => {
      const { reject, resolve, activeName } = options;
      Power.includes(activeName) ? handlerPower(activeName, reject) : resolve();
    };

    const handlerPower = (activeName, reject) => {
      const { path } = tabsMap.find((item) => item.id === activeName);
      const { href } = router.resolve(path);
      window.open(href);
      reject();
    };

    onBeforeUnmount(() => {
      unref(gather)[JiyunBasinSymbolKey].clear();
    });

    return {
      ...useTabs(tabsMap, tabDefault),
      beforeLeave,
    };
  },
};
</script>
<style lang='scss' scoped>
@import "./basin-jyh.scss";
</style>