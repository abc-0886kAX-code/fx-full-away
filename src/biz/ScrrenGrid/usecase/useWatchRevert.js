/*
 * @FilePath: \3D防汛作战\src\biz\ScrrenGrid\usecase\useWatchRevert.js
 * @Author: zhangyang
 * @Date: 2022-06-16 11:24:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-04 11:17:49
 * @Description: 
 */
import {
    computed, inject,
    unref, watch
} from "@vue/composition-api";

export function useWatchRevert(field, options) {
    const {
        setupDriver
    } = options;

    const watchRevert = inject("revertRefs", {
        key: "",
        skip: []
    });
    const revertKey = computed(() => unref(watchRevert).key);
    const revertMap = computed(() => unref(watchRevert).skip);
    const isRevert = computed(() => !unref(revertMap).includes(field));

    watch(
        () => unref(revertKey),
        () => unref(isRevert) && setupDriver()
    );

    return {}
}
