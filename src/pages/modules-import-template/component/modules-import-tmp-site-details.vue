<!--
 * @FilePath: \3D防汛作战\src\pages\modules-import-template\component\modules-import-tmp-site-details.vue
 * @Author: zhangyang
 * @Date: 2022-07-11 15:29:26
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-12 14:28:34
 * @Description: 
-->
<template>
    <el-form class='modules-import-tmp-site-details' :model="formData" :rules="formRules" ref="formRefs" size="mini"
        label-width="120px">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="测站区县" prop="addvcdid">
                    <el-select v-model="formData.addvcdid" :clearable="true" placeholder="请选择测站区县"
                        @change="handlerCountyChange">
                        <template v-for="item in formCounty">
                            <el-option :key="item.code" :label="item.description" :value="item.code"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="测站站点" prop="stcd">
                    <template #label>
                        <el-tooltip effect="dark" content="请优先选择测站区县" placement="top">
                            <span>测站站点 <i class="el-icon-question"></i></span>
                        </el-tooltip>
                    </template>
                    <el-select v-model="formData.stcd" :clearable="true" :loading="formSiteLoad"
                        :disabled="formSiteUsable" placeholder="请选择测站站点">
                        <template v-for="item in formSite">
                            <el-option :key="item.stcd" :label="item.stnm" :value="item.stcd"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="测站排序" prop="siteind">
                    <el-input-number v-model="formData.siteind" :min="0">
                    </el-input-number>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item>
            <el-button type="primary" plain @click="handlerSubmit">提交</el-button>
            <el-button type="danger" plain @click="handlerReset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { onMounted, inject, unref, computed, reactive, shallowRef, ref } from "@vue/composition-api";
import { isNil, isString } from "lodash";
import { Load } from "@/biz/share/entify/Load";
import { icmTemplateBySiteList } from "@/api/icm/import.api";
import { districtTypeGet } from "@/api/common.api";
export default {
    name: 'modules-import-tmp-site-details',
    mixins: [],
    components: {},
    props: {
        tmpInfo: Object,
    },
    emit: ["onSave"],
    setup(props, context) {
        const { loading, setupLoading } = Load(true);
        const { dialogLoadEnd } = inject("icmSiteDialog");
        const formRefs = ref();
        const formData = reactive({
            addvcdid: unref(props).tmpInfo?.addvcdid ?? "",
            siteind: unref(props).tmpInfo?.siteind ?? 0,
            stcd: unref(props).tmpInfo?.stcd ?? "",
        });
        const formRules = {
            stcd: [
                { required: true, message: '请选择测站站点', trigger: 'change' }
            ],
            addvcdid: [
                { required: true, message: '请选择测站区域', trigger: 'change' }
            ]
        };
        const formSite = shallowRef([]);
        const formCounty = shallowRef([]);
        const notSite = computed(() => isNil(unref(props)?.info?.stcd));
        const siteListParams = computed(() => {
            return Object.assign({}, unref(props).tmpInfo, {
                addvcd: unref(formData).addvcdid
            });
        });
        const formSiteUsable = computed(() => {
            if (!isString(unref(siteListParams).addvcd)) return true;

            return unref(siteListParams).addvcd <= 0;
        });
        async function setupFormDataSite(params) {
            setupLoading(true);
            formSite.value = await icmTemplateBySiteList(params);
            setupLoading(false);
        }

        async function handlerSubmit() {
            try {
                await unref(formRefs).validate();
                context.emit("onSave", unref(formData));
            } catch (error) {
                console.log(error);
            }
        }
        function handlerReset() {
            unref(formRefs).resetFields();
        }

        async function handlerCountyChange() {
            formData.stcd = "";
            setupFormDataSite(unref(siteListParams));
        }

        onMounted(async () => {
            formCounty.value = await districtTypeGet();
            formSite.value = await icmTemplateBySiteList(unref(siteListParams));
            setupLoading(false);
            dialogLoadEnd();
        });

        return {
            formRefs,
            formData,
            formRules,
            formSiteUsable,
            formSiteLoad: loading,
            formSite,
            formCounty,
            notSite,
            handlerSubmit,
            handlerReset,
            handlerCountyChange
        }
    }
};
</script>
<style lang='scss' scoped>
.modules-import-tmp-site-details {
    width: 100%;
    height: 100%;
    padding: 0 12px;
    overflow: hidden;
    box-sizing: border-box;
}

/deep/.el-form-item__label {
    color: #fff;
}
</style>
