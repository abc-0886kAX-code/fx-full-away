/*
 * @Author: zhangyang
 * @Date: 2022-04-25 10:30:17
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-26 22:03:59
 * @Description: file content
 */
import {
    inject,
    shallowRef,
    computed,
} from "@vue/composition-api";

import { Mars3dSymbolName } from "../share/context";

export function useMars3d() {
    const mapviewRef = inject(Mars3dSymbolName, shallowRef(null));

    const mapview = computed(() => {
        return mapviewRef.value.view;
    });

    return {
        mapview
    };
}