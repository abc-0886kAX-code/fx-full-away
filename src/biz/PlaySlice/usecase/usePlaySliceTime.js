/*
 * @Author: maggot-code
 * @Date: 2022-05-25 18:30:07
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-16 23:59:04
 * @Description: file content
 */
import store from "@/stroe";
import { isNil } from "lodash";
import { onMounted, onBeforeUnmount, watch, unref, computed } from "@vue/composition-api";
import { usePlaySliceState } from "@/biz/PlaySlice/usecase/usePlaySliceState";

const STEP = 0.8;

export function usePlaySliceTime() {
    let timer;

    const { playState } = usePlaySliceState();

    const setupAutoPlay = () => store.dispatch("_setupPlayState", true);

    const clearPlayTime = () => {
        if (isNil(timer)) return;
        clearInterval(timer);
        timer = null;
    }

    const setupWatchPlayState = (state) => {
        if (!state) return clearPlayTime();

        timer = setInterval(() => {
            store.dispatch("_setupActiveAutoGrow");
        }, STEP * 1000);
    }

    const removeWatch = watch(
        () => unref(playState),
        setupWatchPlayState,
        { immediate: true }
    );

    onBeforeUnmount(() => {
        store.dispatch("_setupActive", 0);
        removeWatch();
        clearPlayTime();
    });

    return {
        setupAutoPlay,
        clearPlayTime
    }
}
