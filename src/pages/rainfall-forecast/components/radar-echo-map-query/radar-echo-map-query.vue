<!--
 * @Author: maggot-code
 * @Date: 2022-05-26 13:47:16
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-14 17:07:50
 * @Description: file content
-->
<template>
    <div class="radar-echo-map-query">
        <mg-form ref="searchRefs" proName="/radar-echo-map-query" :schema="searchFormSchema" :job="searchFormJob">
            <template #form-button>
                <el-button plain type="primary" size="mini" :disabled="playState" @click="handlerQuery">查询</el-button>
            </template>
        </mg-form>
    </div>
</template>

<script>
import { useSocketMessage, SOCKET_MESSAGE_RADAR } from "@/biz/Socket";
import { usePlaySliceState } from "@/biz/PlaySlice/usecase/usePlaySliceState";
import store from "@/stroe";
import { onBeforeUnmount, onMounted, unref } from "@vue/composition-api";
import { useDatePickForm } from "./useRadarEchoForm.js";
export default {
    name: "radar-echo-map-query",
    mixins: [],
    components: {},
    props: {},
    setup() {
        const { setupSocketMessage } = useSocketMessage();
        const { playState } = usePlaySliceState();

        const form = useDatePickForm();

        function handlerQuery() {
            const { data } = unref(form.searchRefs).formOutput();
            const params = {
                starttime: form.setupAnalysisValue(data).starttime,
                endtime: form.setupAnalysisValue(data).endtime,
            };
            store.dispatch("_setupQueryParams", params);
        }
        setupSocketMessage(SOCKET_MESSAGE_RADAR, handlerQuery);
        onMounted(() => {
            handlerQuery();
        });

        onBeforeUnmount(() => {
            store.dispatch("_setupQueryParams", {});
        });

        return {
            playState,
            handlerQuery,
            ...form,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./radar-echo-map-query.scss";
</style>
