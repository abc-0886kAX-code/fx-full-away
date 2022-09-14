<!--
 * @Author: zhangxin
 * @Date: 2022-06-28 13:45:32
 * @LastEditors: abc088_6kAX_code 86451477+abc-0886kAX-code@users.noreply.github.com
 * @LastEditTime: 2022-07-29 18:04:33
 * @Description: 
-->
<template>
  <div class="city-waterlogging-centre">
    <ytxd-tabs
      class="city-waterlogging-centre-tabs"
      :active.sync="tabActive"
      :tabs="tabsMap"
    ></ytxd-tabs>
    <component :is="tabActive"></component>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { useTabs } from "@/composables/useTabs";
import { componentsInstall } from "./components/components-install";

const tabDefault = "waterlogging-forecast-centre";
const tabsMap = [
  // {
  //     id: "basic-data-centre",
  //     label: "基础数据",
  // },
  {
    id: "waterlogging-forecast-centre",
    label: "内涝预报",
  },
  {
    id: "Integrated-dispatching-centre",
    label: "一体化调度",
  },
  {
    id: "risk-warning-centre",
    label: "风险预警",
  },
];

export default {
  name: "city-waterlogging-centre",
  //混入
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: { ...componentsInstall },
  props: {},
  setup() {
    return {
      ...useTabs(tabsMap, tabDefault),
    };
  },
};
</script>
<style lang='scss' scoped>
@import "./city-waterlogging-centre.scss";
</style>