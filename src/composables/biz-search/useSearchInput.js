/*
 * @FilePath: \3D防汛作战\src\composables\biz-search\useSearchInput.js
 * @Author: zhangyang
 * @Date: 2022-07-05 10:20:41
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-31 17:06:42
 * @Description: 
 */
import { isString } from "lodash";

import { useSearchInput, useSearchNumber } from "@/composables/biz-search/useSearch";

export function usePlainStringInput(field, options = {}) {
    const { title, tips, column, disabled } = options;
    const label = isString(title) ? title : "";
    const col = column ?? 12;

    const { schema, setupValue } = useSearchInput(field, {
        ui: {
            col,
            label,
            disabled: disabled ?? false,
            placeholder: tips ?? "请输入内容",
        },
        ...options
    });

    return {
        plainStringSchema: schema,
        plainStringSetupValue: setupValue
    }
}

export function usePlainNumberInput(field, options = {}) {
    const { title, tips, column, disabled, min } = options;
    const label = isString(title) ? title : "";
    const col = column ?? 12;

    const { schema, setupValue } = useSearchNumber(field, {
        ui: {
            col,
            label,
            disabled: disabled ?? false,
            placeholder: tips ?? "请输入内容",
            min: min ?? 1
        },
        ...options
    });

    return {
        plainNumberSchema: schema,
        plainNumberSetupValue: setupValue
    }
}
