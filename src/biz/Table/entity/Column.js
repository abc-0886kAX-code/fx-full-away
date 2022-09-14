/*
 * @Author: zhangyang
 * @Date: 2022-04-21 09:16:22
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-27 14:07:08
 * @Description: file content
 */
import { shallowRef } from "@vue/composition-api";

export function Column(sources = []) {
    const column = shallowRef(sources);

    const setupColumn = (sources = []) => column.value = sources;

    return {
        column,
        setupColumn
    }
}