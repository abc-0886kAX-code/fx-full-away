<!--
 * @Author: zhangxin
 * @Date: 2022-06-06 17:21:20
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-16 11:26:33
 * @Description: 
-->
<template>
    <div class="rainfall-events">
        <div class="rainfall-events-select">
            <el-date-picker
                v-model="dateVal"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>

            <el-select v-model="selectVal" placeholder="请选择">
                <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>

            <el-select v-model="addvcdVal" placeholder="请指定区县" :disabled="active">
                <el-option v-for="item in addvcdOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>

            <el-select v-model="riverBasinVal" placeholder="请指定流域" :disabled="active">
                <el-option v-for="item in riverBasinOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <div>
                <el-button @click="executeQuery(params)" type="primary">查询</el-button>
                <el-button @click="reset" type="danger">重置</el-button>
                <el-button @click="exportTable('#tab-chart-box-table', columnWidth, '场次降雨数据')" type="warning"
                    >导出</el-button
                >
            </div>
        </div>
        <div class="rainfall-events-table">
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
import { getSiteRainfallByType } from "../../api/real-time-monitor.api";
import { onMounted, ref, unref, computed } from "@vue/composition-api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import tableHeadJson from "./json/table-head.json";
import addvcdOptions from "./json/addvcd-options.json";
import riverBasinOptions from "./json/river-basin-options.json";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import { exportTable } from "@/utils/export-table.js";
const nowDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
const yesterDay = format(subDays(new Date(), 1), "yyyy-MM-dd HH:mm:ss");

const columnWidthMap = {
    site: [
        {
            wch: 20
        },
        {
            wch: 20
        },
        {
            wch: 15
        },
        {
            wch: 15
        },
        {
            wch: 15
        }
    ],
    addvcd: [
        {
            wch: 20
        },
        {
            wch: 15
        },
        {
            wch: 30
        },
        {
            wch: 30
        }
    ],
    basin: [
        {
            wch: 20
        },
        {
            wch: 15
        },
        {
            wch: 30
        },
        {
            wch: 30
        }
    ]
};

export default {
    name: "rainfall-events",
    //混入
    mixins: [DialogContentMixins],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    setup(props, context) {
        const tableSchema = ref(tableHeadJson.site);
        const tableData = ref([]);
        const dateVal = ref([yesterDay, nowDate]);
        const selectVal = ref("site");
        const addvcdVal = ref("");
        const riverBasinVal = ref("");
        const sort = ref("");
        const order = ref("desc");
        const active = computed(() => selectVal.value !== "site");
        const selectOptions = ref([
            {
                label: "站点",
                value: "site"
            },
            {
                label: "区县",
                value: "addvcd"
            },
            {
                label: "流域",
                value: "basin"
            }
        ]);

        const params = computed(() => ({
            starttime: unref(dateVal)[0],
            endtime: unref(dateVal)[1],
            sitetype: unref(selectVal),
            sort: unref(sort),
            order: unref(order),
            addvcd: unref(active) ? "" : unref(addvcdVal),
            hnnm: unref(active) ? "" : unref(riverBasinVal)
        }));
        const columnWidth = computed(() => {
            return columnWidthMap[selectVal.value];
        });
        const executeQuery = async (params) => {
            context.emit("loadStart");

            tableSchema.value = tableHeadJson[params.sitetype];

            const data = await getSiteRainfallByType(params);

            tableData.value = data;

            context.emit("loadEnd");
        };

        const reset = async () => {
            selectVal.value = "site";
            addvcdVal.value = "";
            riverBasinVal.value = "";
            order.value = "desc";
            sort.value = "";
            dateVal.value = [yesterDay, nowDate];

            await executeQuery(unref(params));
        };

        const tableHandle = (e) => {
            const { order: orderField, prop } = e;
            order.value = orderField;
            sort.value = prop === "id" ? "" : prop;
            executeQuery(unref(params));
        };

        onMounted(async () => {
            await executeQuery(unref(params));
        });
        return {
            active,
            addvcdVal,
            addvcdOptions,
            riverBasinVal,
            riverBasinOptions,
            selectVal,
            selectOptions,
            dateVal,
            tableSchema,
            executeQuery,
            params,
            tableData,
            reset,
            tableHandle,
            columnWidth,
            exportTable
        };
    }
};
</script>
<style lang='scss' scoped>
.rainfall-events {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    &-select {
        height: 15%;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-evenly;
    }
    &-table {
        height: 85%;
    }
}
</style>