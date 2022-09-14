/*
 * @FilePath: \3D防汛作战\src\biz\ScrrenGrid\usecase\useRevert.js
 * @Author: zhangyang
 * @Date: 2022-06-16 11:23:56
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-16 11:54:14
 * @Description: 
 */
import { Sign } from "@/biz/share/entify/Sign";
import {
    unref,
    ref,
    computed,
    provide
} from "@vue/composition-api";

export function useRevert() {
    const { sign, setupSign } = Sign();
    const revertMap = ref([]);
    const revertProps = computed(() => ({
        key: unref(sign),
        skip: unref(revertMap)
    }));

    const useRevertRefs = provide("revertRefs", revertProps);

    function setupRevertMap(map) {
        revertMap.value = map;
        setupSign();
    }

    return {
        useRevertRefs,
        setupRevertMap
    }
}
