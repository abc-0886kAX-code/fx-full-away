<!--
 * @Author: zhangxin
 * @Date: 2022-07-04 10:56:28
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-04 13:24:03
 * @Description: 
-->
<template>
    <el-row class="ytxd-biz-info icm-run-list-progress" :gutter="20">
        <el-col class="introduce-query icm-run-list-progress-item" :span="12">
            <h4>模拟状态</h4>
            <el-tag effect="dark" :type="progressStatus.type">{{
                progressStatus.tips
            }}</el-tag>
        </el-col>

        <el-col class="introduce-query icm-run-list-progress-item" :span="12">
            <h4>模拟子状态</h4>
            <el-tag effect="plain" :type="progressSubStatus.type">{{
                progressSubStatus.tips
            }}</el-tag>
        </el-col>

        <template v-for="cell in progressTemplate">
            <el-col
                class="introduce-query icm-run-list-progress-item"
                :key="cell.prop"
                :span="6"
            >
                <h4>{{ cell.label }}</h4>
                <p>{{ cell.value }}</p>
            </el-col>
        </template>

        <el-col class="introduce-query" :span="24">
            <h4>模型路径</h4>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <template v-for="(path, index) in progressPath">
                    <el-breadcrumb-item :key="index">{{
                        path
                    }}</el-breadcrumb-item>
                </template>
            </el-breadcrumb>
        </el-col>
    </el-row>
</template>

<script>
import { onMounted, inject } from "@vue/composition-api";
import { useProgress } from "../icm-progress-query/usecase/useProgress";
import { icmQuerySimulationProgressStatus } from "@/api/icm/run.api";

import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
export default {
    name: "icm-run-list-progress",
    mixins: [DialogContentMixins],
    components: {},
    props: {},
    setup(props) {
        const { dialogLoadStart, dialogLoadEnd } = inject("dialog");
        const progress = useProgress();

        const executeQuery = async () => {
            dialogLoadStart();
            const data = await icmQuerySimulationProgressStatus({
                simId: props.info.id,
            });
            progress.setupInfo(data);
            dialogLoadEnd();
            return { data };
        };

        onMounted(() => {
            executeQuery();
        });

        return {
            ...progress,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "~@/assets/style/biz-info.scss";
@import "./icm-run-list-progress.scss";
</style>