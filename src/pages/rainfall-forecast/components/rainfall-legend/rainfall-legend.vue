<!--
 * @Author: maggot-code
 * @Date: 2022-05-26 17:42:13
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-02 13:13:52
 * @Description: file content
-->
<template>
  <div class="rainfall-legend" id="rainfall-legend">
    <div class="rainfall-legend-head">
      <el-tag
        v-if="isTag"
        class="rainfall-legend-head-tag"
        effect="plain"
        size="small"
        type="danger"
        >{{ date }}</el-tag
      >
      <el-tag
        v-if="isLabel"
        class="rainfall-legend-head-tag"
        effect="plain"
        size="small"
        >{{ label }}</el-tag
      >
      <el-button type="primary" plain size="mini" @click="handlerReload"
        >刷新</el-button
      >
    </div>
    <div class="rainfall-legend-tag">
      <template v-for="(item, index) in tag">
        <rainfall-legend-item
          :key="index"
          :color="item.color"
          :text="item.label"
        ></rainfall-legend-item>
      </template>
    </div>
  </div>
</template>

<script>
import { unref, computed } from "@vue/composition-api";
import RainfallLegendItem from "./rainfall-legend-item.vue";

export default {
  name: "rainfall-legend",
  mixins: [],
  components: { RainfallLegendItem },
  props: {
    info: Object,
    isLabel: {
      type: Boolean,
      default: true,
    },
    isTag: {
      type: Boolean,
      default: true,
    },
  },
  emit: ["onReload"],
  setup(props, context) {
    const date = computed(() => unref(props.info.date));
    const label = computed(() => unref(props.info.label));
    const tag = computed(() => unref(props.info.color));

    function handlerReload() {
      context.emit("onReload");
    }

    return {
      date,
      label,
      tag,
      handlerReload,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./rainfall-legend.scss";
</style>
