/*
 * @Author: zhangyang
 * @Date: 2022-04-21 09:13:11
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-27 16:53:06
 * @Description: file content
 */
import { ref } from "@vue/composition-api";
import { flake } from "maggot-utils";

export function Sign(value = flake.gen()) {
    const sign = ref(value);

    const setupSign = (value = flake.gen()) => sign.value = value;

    return {
        sign,
        setupSign
    }
}