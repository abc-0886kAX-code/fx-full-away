/*
 * @Author: zhangyang
 * @Date: 2022-06-07 10:15:33
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-07 10:32:00
 * @Description: file content
 */
import { unref, shallowRef } from "@vue/composition-api";

export function useChoice(response) {
    const choice = shallowRef(response ?? []);
    function setChoice(data) {
        choice.value = data;
    }

    return {
        choice,
        setChoice
    }
}