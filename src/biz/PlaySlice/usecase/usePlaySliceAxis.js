/*
 * @Author: maggot-code
 * @Date: 2022-05-26 13:33:41
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-05-26 13:51:47
 * @Description: file content
 */
import store from "@/stroe";
import { onBeforeUnmount, unref, computed } from "@vue/composition-api";

export function usePlaySliceAxis() {
    const useAxis = computed(() => store.getters.isVisabled);
    const axisComponent = computed(() => store.getters.componentName);

    onBeforeUnmount(() => {
        store.dispatch("_setupComponentName", "");
    });

    return {
        useAxis,
        axisComponent
    }
}