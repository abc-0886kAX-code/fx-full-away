<!--
 * @Author: zhangxin
 * @Date: 2022-06-27 17:35:18
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-08 16:31:43
 * @Description: 
-->
<template>
    <div class="dialog-alert-generation-table">
        <div class="dialog-alert-generation-table-select">
            <el-button @click="exportWord" type="warning">导出</el-button>
        </div>

        <div class="dialog-alert-generation-table-box">
            <mg-table :tableSchema="tableSchema" :tableData="tableData"></mg-table>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { ref } from "@vue/composition-api";
import { exportDangerSite } from "../../biz/FloodWarn/api/common.api";

const tableColumn = Object.freeze({
    uiSchema: {
        stripe: true
    },
    columnSchema: [
        {
            label: "FID",
            prop: "fid",
            mold: "default",
            align: "center",
            width: 100
        },
        {
            label: "村名",
            prop: "stnm",
            mold: "default",
            align: "center"
        },
        {
            label: "降雨差值",
            prop: "r",
            mold: "default",
            align: "center"
        },
        {
            label: "危险等级",
            prop: "dangerlevel",
            mold: "default",
            align: "center"
        }
    ]
});

export default {
    name: "dialog-alert-generation-table",
    //混入
    mixins: [DialogContentMixins],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    setup(props, context) {
        const tableSchema = ref(tableColumn);
        const tableData = ref(props.info.basicList);
        context.emit("loadEnd");

        const exportWord = async () => {
            const { path } = await exportDangerSite({
                type: props.info.type,
                dangertype: props.info.dangertype
            });
            const a = document.createElement("a");
            a.href = process.env.VUE_APP_IMG_HOST + "/" + path;
            a.download = "风险区域村庄表.docx";
            a.click();
        };

        return {
            exportWord,
            tableSchema,
            tableData
        };
    }
};
</script>
<style lang='scss' scoped>
@import "./dialog-alert-generation-table";
</style>
