<!--
 * @FilePath: \3D防汛作战\src\pages\modules-run-start\modules-run-start.vue
 * @Author: zhangyang
 * @Date: 2022-07-04 16:09:51
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-06 13:54:16
 * @Description: 
-->
<template>
    <div class="modules-body modules-run-start" v-loading="loading" v-bind="loadStyle">
        <div class="modules-run-start-form">
            <mg-form v-if="!searchVisable" class="modules-run-start-search" ref="searchRefs" proName="/icm"
                :schema="searchFormSchema" :job="searchFormJob">
                <template #form-button>
                    <el-button plain type="primary" @click="handlerStartup">启动</el-button>
                    <el-button plain type="primary" @click="handlerReset">重置</el-button>
                </template>
            </mg-form>
        </div>

        <div class="modules-run-start-result">
            <div class="modules-run-start-result-item">
                <h3 class="modules-run-start-result-item-title">模拟状态：</h3>
                <el-tag :type="statusResult.statusType">{{ statusResult.statusTips }}</el-tag>
            </div>
            <div class="modules-run-start-result-item">
                <h3 class="modules-run-start-result-item-title">运行名称：</h3>
                <p class="modules-run-start-result-item-text">{{ statusResult.name }}</p>
            </div>
            <div class="modules-run-start-result-item">
                <h3 class="modules-run-start-result-item-title">状态描述：</h3>
                <p class="modules-run-start-result-item-text">{{ statusResult.message }}</p>
            </div>
            <div class="modules-run-start-result-item">
                <h3 class="modules-run-start-result-item-title">模拟路径：</h3>
                <div>
                    <template v-for="(node, index) in statusResult.path">
                        <p class="modules-run-start-result-item-text modules-run-start-result-item-direction"
                            :key="index">
                            {{ node }}
                        </p>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, unref } from "@vue/composition-api";

import { Load } from "@/biz/share/entify/Load";
import { useImitateForm } from "./useImitateForm";
import { useImitateStatus } from "./useImitateStatus";

import {
    icmUsableModelNetwork,
    icmModuleStartup
} from "@/api/icm/run.api";

export default {
    name: "modules-run-start",
    mixins: [],
    components: {},
    props: {},
    setup() {
        const { loading, loadStyle, setupLoading } = Load();
        const form = useImitateForm();
        const { statusResult, setupStatusResult } = useImitateStatus(form.searchRefs);

        async function handlerStartup() {
            const { validate, data } = unref(form.searchRefs).formOutput();
            try {
                await validate();
            } catch (error) {
                console.log(error);
                return setupNoAdmittance();
            }

            setupLoading(true);
            const status = await setupUsableModelNetwork(data);
            if (!status) return setupLoading(false);

            setupModelRun(form.setupAnalysisValue(data));
        }
        function handlerReset() {
            unref(form.searchRefs).resetForm();
            setupStatusResult();
        }

        function setupNoAdmittance() {
            console.log('11');
        }
        async function setupUsableModelNetwork(data) {
            try {
                const { status, message } = await icmUsableModelNetwork(data);
                console.log(message);
                return status === "success";
            } catch (error) {
                return false;
            }
        }
        async function setupModelRun(data) {
            const result = await icmModuleStartup(data).catch(setupNoAdmittance).finally(setupLoading);
            setupStatusResult(result);
        }

        onMounted(() => {
            form.setupInstallEnums().finally(() => {
                setupLoading();
                form.setupSearchVisable();
            });
        });

        return {
            ...form,
            loading,
            loadStyle,
            statusResult,
            handlerStartup,
            handlerReset
        }
    }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/style/modules-body.scss";
@import "./modules-run-start.scss";
</style>
