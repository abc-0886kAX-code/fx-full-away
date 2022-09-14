/*
 * @Author: maggot-code
 * @Date: 2022-05-25 18:31:58
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-08 13:19:00
 * @Description: file content
 */
import store from "@/stroe";
import { computed } from "@vue/composition-api";

let timer;

export function usePlaySliceState() {
    const playState = computed(() => store.getters.playState);

    const setupPlayStart = () => {
        store.dispatch("_setupPlayState", true);
    }

    const setupPlayStop = () => {
        store.dispatch("_setupPlayState", false);
    }

    return {
        playState,
        setupPlayStart,
        setupPlayStop
    }
}