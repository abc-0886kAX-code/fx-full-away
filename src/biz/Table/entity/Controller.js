/*
 * @Author: zhangxin
 * @Date: 2022-04-27 10:46:50
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-27 14:06:37
 * @Description: 
 */

import { shallowRef } from "@vue/composition-api";

export function Controller(sources = {}) {
    const controller = shallowRef(sources);

    const setupController = (sources = {}) => controller.value = sources;

    return {
        controller,
        setupController
    }
}