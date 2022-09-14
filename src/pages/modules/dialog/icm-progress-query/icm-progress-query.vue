<!--
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-progress-query\icm-progress-query.vue
 * @Author: zhangyang
 * @Date: 2022-06-30 16:01:50
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-01 18:00:14
 * @Description: 
-->
<template>
    <el-row class='ytxd-biz-info icm-progress-query' :gutter="20">
        <el-col class="introduce-query icm-progress-query-item" :span="12">
            <h4>模拟状态</h4>
            <el-tag effect="dark" :type="progressStatus.type">{{ progressStatus.tips }}</el-tag>
        </el-col>

        <el-col class="introduce-query icm-progress-query-item" :span="12">
            <h4>模拟子状态</h4>
            <el-tag effect="plain" :type="progressSubStatus.type">{{ progressSubStatus.tips }}</el-tag>
        </el-col>

        <template v-for="(cell) in progressTemplate">
            <el-col class="introduce-query icm-progress-query-item" :key="cell.prop" :span="6">
                <h4>{{ cell.label }}</h4>
                <p>{{ cell.value }}</p>
            </el-col>
        </template>

        <el-col class="introduce-query " :span="24">
            <h4>模型路径</h4>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <template v-for="(path, index) in progressPath">
                    <el-breadcrumb-item :key="index">{{ path }}</el-breadcrumb-item>
                </template>
            </el-breadcrumb>
        </el-col>
    </el-row>
</template>

<script>
import { onMounted, inject } from "@vue/composition-api";
import { useProgress } from "./usecase/useProgress";
import { icmQueryModuleProgress } from "@/api/icm/query.api";

import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
export default {
    name: 'icm-progress-query',
    mixins: [DialogContentMixins],
    components: {},
    props: {},
    setup(props) {
        const {
            dialogLoadStart,
            dialogLoadEnd
        } = inject("dialog");
        const progress = useProgress();

        const executeQuery = async () => {
            dialogLoadStart();
            const data = await icmQueryModuleProgress(props.info);
            progress.setupInfo(data);
            dialogLoadEnd();
            return { data };
        }

        onMounted(() => {
            executeQuery();
        });

        return {
            ...progress
        }
    }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/style/biz-info.scss";
@import "./icm-progress-query.scss";
</style>
