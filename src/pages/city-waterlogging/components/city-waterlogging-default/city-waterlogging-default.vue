<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-15 15:30:49
 * @Description: 
-->
<template>
    <div class="city-waterlogging-default">
        <panel-table id="city-waterlogging-default"></panel-table>
    </div>
</template>

<script>
import store from "@/stroe";
import { onMounted } from "@vue/composition-api";
import { useTableData } from "@/biz/Table";
import { getDefaultTableData } from "../../api/common.js";
import { default as PanelTable } from "@/components/panel-table";

const tableColumn = [
    {
        prop: "name",
        mold: "default",
        label: "名称",
        showOverflow: "title",
        align: "center"
    },
    {
        prop: "area",
        mold: "default",
        label: "地址",
        align: "center"
    }
];

export default {
    name: "city-waterlogging-default",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { PanelTable },
    props: {},
    setup() {
        const { setupTableColumn, setupTableData, setupUiSchema } = useTableData("city-waterlogging-default");
        setupTableColumn(tableColumn);
        setupUiSchema({
            isIndex: true,
            stripe: true
        });

        const executeQuery = async () => {
            // 打断之前的请求
            store.dispatch("_cancelTagRequest", "homeIndex");
            await setupTableData(getDefaultTableData().then((res) => res.value));
        };

        onMounted(async () => {
            await executeQuery();
        });

        return {};
    }
};
</script>
<style lang='scss' scoped>
@import "./city-waterlogging-default.scss";
</style>