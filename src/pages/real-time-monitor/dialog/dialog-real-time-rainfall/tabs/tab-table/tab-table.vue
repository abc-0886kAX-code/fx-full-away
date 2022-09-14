<!--
 * @Author: zhangxin
 * @Date: 2022-05-26 14:23:35
 * @LastEditors: abc088_6kAX_code 86451477+abc-0886kAX-code@users.noreply.github.com
 * @LastEditTime: 2022-07-27 17:33:49
 * @Description: 
-->
<template>
  <div class="tab-body tab-table">
    <div class="tab-chart-select">
      <el-date-picker
        v-model="dateVal"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>

      <div>
        <el-button @click="executeQuery(params)" type="primary">查询</el-button>
        <el-button @click="reset" type="danger">重置</el-button>
        <el-button
          @click="
            exportTable('#tab-chart-box-table', columnWidth, '雨量站数据')
          "
          type="warning"
          >导出</el-button
        >
      </div>
    </div>

    <div class="tab-chart-box">
      <mg-table
        id="tab-chart-box-table"
        :tableSchema="tableSchema"
        :tableData="tableData"
        @tableHandle="tableHandle"
      ></mg-table>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { exportTable } from "@/utils/export-table.js";
import { computed, onMounted, ref, unref } from "@vue/composition-api";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import { getRainDataList } from "../../../../api/real-time-monitor.api";

const nowDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
const yesterDay = format(subDays(new Date(), 1), "yyyy-MM-dd HH:mm:ss");

const columnWidth = [
  {
    wch: 20,
  },
  {
    wch: 30,
  },
  {
    wch: 10,
  },
];

const testOptions = Object.freeze({
  uiSchema: {
    stripe: true,
  },
  columnSchema: [
    {
      prop: "stnm",
      mold: "default",
      label: "站名",
      align: "center",
    },
    {
      prop: "tm",
      mold: "default",
      label: "时间",
      isSort: true,
      align: "center",
    },
    {
      prop: "r",
      mold: "default",
      label: "降雨量(mm)",
      isSort: true,
      align: "center",
    },
  ],
});

export default {
  name: "tab-table",
  //混入
  mixins: [DialogContentMixins],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  setup(props, context) {
    const dateVal = ref([yesterDay, nowDate]);
    const tableSchema = ref(testOptions);
    const tableData = ref([]);
    const sort = ref("tm");
    const order = ref("desc");
    const params = computed(() => ({
      starttime: unref(dateVal)[0],
      endtime: unref(dateVal)[1],
      stcd: props.info.stcd,
      sort: unref(sort),
      order: unref(order),
    }));

    const executeQuery = async (params) => {
      context.emit("loadStart");
      const data = await getRainDataList(params);
      tableData.value = data;
      context.emit("loadEnd");
    };

    const reset = async () => {
      dateVal.value = [yesterDay, nowDate];
      order.value = "desc";
      sort.value = "tm";
      await executeQuery(unref(params));
    };

    const tableHandle = (e) => {
      const { order: orderField, prop } = e;
      order.value = orderField;
      sort.value = prop === "id" ? "tm" : prop;
      executeQuery(unref(params));
    };

    onMounted(async () => {
      await executeQuery(unref(params));
    });

    return {
      dateVal,
      executeQuery,
      params,
      reset,
      tableSchema,
      tableData,
      columnWidth,
      tableHandle,
      exportTable,
    };
  },
};
</script>
<style lang='scss' scoped>
@import "~@/assets/style/tab-select-body.scss";
</style>