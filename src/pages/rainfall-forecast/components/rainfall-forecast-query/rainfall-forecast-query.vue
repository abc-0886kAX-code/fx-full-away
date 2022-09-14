<!--
 * @Author: maggot-code
 * @Date: 2022-05-27 16:59:43
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-15 15:24:11
 * @Description: file content
-->
<template>
    <div class="rainfall-forecast-query">
        <el-date-picker
            v-model="timeValue"
            :disabled="playState"
            v-bind="datePickProps"
        >
        </el-date-picker>
        <el-button
            style="margin-left: 10px"
            plain
            type="primary"
            size="mini"
            :disabled="playState"
            @click="handlerQuery"
            >查询</el-button
        >
    </div>
</template>

<script>
import store from "@/stroe";
import {
    onMounted,
    onBeforeUnmount,
    unref,
    computed,
} from "@vue/composition-api";
import { usePlaySliceState } from "@/biz/PlaySlice/usecase/usePlaySliceState";
import { useDatePick } from "@/composables/useDatePick";

export default {
    name: "rainfall-forecast-query",
    mixins: [],
    components: {},
    props: {},
    setup() {
        const { playState } = usePlaySliceState();
        const { timeValue, datePickProps } = useDatePick({
            type: "datetime",
        });
        const params = computed(() => {
            return {
                starttime: unref(timeValue),
            };
        });

        function handlerQuery() {
            store.dispatch("_setupQueryParams", unref(params));
        }

        onMounted(() => {
            handlerQuery();
        });

        onBeforeUnmount(() => {
            store.dispatch("_setupQueryParams", {});
        });

        return {
            playState,
            timeValue,
            datePickProps,
            handlerQuery,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./rainfall-forecast-query.scss";
</style>