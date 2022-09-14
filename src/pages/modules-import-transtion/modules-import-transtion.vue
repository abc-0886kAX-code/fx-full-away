<!--
 * @FilePath: \3D防汛作战\src\pages\modules-import-transtion\modules-import-transtion.vue
 * @Author: zhangyang
 * @Date: 2022-06-29 10:19:20
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-13 10:32:03
 * @Description: 
-->
<template>
    <data-import-form
        class="modules-body modules-import-transtion"
        v-loading="loading"
        v-bind="loadStyle"
        :structure="dataStructure"
        @submitForm="submitForm"
        @resetForm="resetForm"
    ></data-import-form>
</template>

<script>
import {
    ref,
    onMounted,
    unref,
    computed,
    reactive,
} from "@vue/composition-api";
import { getTemplateInfo, importRainfallData } from "@/api/icm/import.api";
import DataImportForm from "@/components/data-import-form";
import rules from "./rules";
import { notify } from "@/plugins/element";
import { Load } from "@/biz/share/entify/Load";

export default {
    name: "modules-import-transtion",
    mixins: [],
    components: { DataImportForm },
    props: {},
    setup() {
        let ruleForm = reactive({});
        let dataStructure = {
            rules: rules,
            inputInfo: {
                label: "模板名称",
                placeholder: "请输入模板名称",
            },
            selectInfo: {
                label: "模板类型",
                selectData: ref([]),
            },
            datePickerInfo: {
                label: "日期范围",
            },
            textareaInfo: {
                label: "备注信息",
                placeholder: "请输入备注信息",
            },
            subButtonInfo: {
                type: "primary",
                label: "立即导入",
            },
            resetButtonInfo: {
                label: "重置",
                type: "warring",
            },
            downloadButtonInfo: {
                label: "下载",
                type: "success",
            },
        };
        const params = computed(() => {
            return {
                tmpname: ruleForm.templateName,
                tmptype: "regulator",
                note: ruleForm.remarksVale,
                tmpid: JSON.parse(ruleForm.importoptions).tmpid,
                starttime: ruleForm.timeValue[0],
                endtime: ruleForm.timeValue[1],
            };
        });

        const { loadStyle, loading, setupLoading: setupHomeLoading } = Load();

        const { setupLoading } = Load(false);

        const submitForm = (formEl, source) => {
            if (!formEl) return;
            setupLoading(true);
            ruleForm = source;
            formEl.validate(async (valid) => {
                if (!valid) return false;
                const options = await importRainfallData(unref(params)).finally(
                    setupLoading
                );
                notify(options.title, options.type, options.msg);
            });
        };
        const resetForm = (formEl) => {
            formEl.resetFields();
        };

        const executeQuery = async () => {
            setupHomeLoading(true);
            const data = await getTemplateInfo({
                tmptype: "regulator",
            });
            dataStructure.selectInfo.selectData.value = data || [];

            setupHomeLoading(false);
        };

        onMounted(() => {
            executeQuery();
        });

        return {
            submitForm,
            resetForm,
            dataStructure,
            loadStyle,
            loading,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "~@/assets/style/modules-body.scss";
@import "./modules-import-transtion.scss";
</style>
