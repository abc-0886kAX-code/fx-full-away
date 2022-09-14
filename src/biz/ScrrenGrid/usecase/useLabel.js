/*
 * @Author: maggot-code
 * @Date: 2022-05-19 20:14:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-05-19 20:16:43
 * @Description: file content
 */
import { unref, computed } from "@vue/composition-api";

export function useLabel(node) {
    const label = computed(() => {
        return unref(node)?.label ?? `节点${unref(node).id}`;
    });

    return {
        label
    }
}