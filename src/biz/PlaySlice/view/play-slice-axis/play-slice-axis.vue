<!--
 * @Author: maggot-code
 * @Date: 2022-05-24 20:01:27
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-15 14:41:06
 * @Description: file content
-->
<template>
    <div :class="className" v-loading="loading" v-bind="loadStyle">
        <div class="play-slice-axis-group">
            <div class="play-slice-axis-group-slot">
                <slot></slot>
            </div>

            <div class="play-slice-axis-group-time" v-if="!notShowTime">
                {{ nodeTime }}
            </div>

            <div class="play-slice-axis-group-control">
                <el-button
                    class="play-slice-axis-group-control-button"
                    plain
                    type="primary"
                    size="mini"
                    :disabled="playState"
                    @click="setupPlayStart"
                    >开始</el-button
                >
                <el-button
                    class="play-slice-axis-group-control-button"
                    plain
                    type="warning"
                    size="mini"
                    :disabled="!playState"
                    @click="setupPlayStop"
                    >停止</el-button
                >
            </div>
        </div>

        <el-slider
            class="play-slice-axis-slider"
            :value="value"
            :show-stops="true"
            :step="1"
            :min="0"
            :max="max"
            :format-tooltip="formatTooltip"
            :disabled="playState"
            @change="handlerChange"
            @input="handlerInput"
        >
        </el-slider>
    </div>
</template>

<script>
import useUserHomeModule from "@/biz/User/usecase/useUserModule";
import store from "@/stroe";
import { unref, computed } from "@vue/composition-api";

import { usePlaySliceState } from "@/biz/PlaySlice/usecase/usePlaySliceState";
import { loadStyle } from "@/biz/share/entify/Load";

export default {
    name: "play-slice-axis",
    mixins: [],
    components: {},
    props: {},
    setup() {
        const modules = useUserHomeModule();
        const className = computed(() => {
            return unref(modules.moduleInfo).progressBarClassName;
        });
        const loading = computed(() => store.getters.playLoading);
        const value = computed(() => store.getters.active);
        const notShowTime = computed(() => store.getters.notShowTime);
        const max = computed(() => {
            const value = store.getters.dataLength - 1;
            return value < 0 ? 0 : value;
        });
        const activeRaw = computed(() => store.getters.find);
        const { playState, setupPlayStart, setupPlayStop } =
            usePlaySliceState();

        const handlerChange = (value) => {
            // console.log(`修改后：${value}`);
        };

        const handlerInput = (value) => {
            // console.log(`修改中：${value}`);
            store.dispatch("_setupActive", value);
        };

        const formatTooltip = () => {
            return unref(activeRaw)?.time ?? "";
        };

        const nodeTime = computed(() => {
            return unref(activeRaw)?.time ?? "暂无时间";
        });

        return {
            loading,
            loadStyle,
            value,
            max,
            playState,
            handlerChange,
            handlerInput,
            formatTooltip,
            setupPlayStart,
            setupPlayStop,
            nodeTime,
            notShowTime,
            className,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./play-slice-axis.scss";
</style>