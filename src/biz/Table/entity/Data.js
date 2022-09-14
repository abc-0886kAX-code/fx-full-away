/*
 * @Author: zhangyang
 * @Date: 2022-04-21 09:17:21
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-24 14:19:30
 * @Description: file content
 */
import { shallowRef } from "@vue/composition-api";

export function Data(sources = []) {
    const data = shallowRef(sources);

    const setupData = (sources = []) => data.value = sources;

    return {
        data,
        setupData
    }
}