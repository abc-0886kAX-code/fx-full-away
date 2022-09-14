/*
 * @FilePath: \3D防汛作战\src\pages\modules\usercase\useRaineventQuery.js
 * @Author: zhangyang
 * @Date: 2022-07-04 15:06:56
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-06 14:59:45
 * @Description: 
 */
import { isString, isObjectLike } from "lodash";

import { useSearchSelect } from "@/composables/biz-search/useSearch";
import { icmQueryRainfallEvent } from "@/api/icm/query.api";
import { formaterEnums } from "./useNetworkQuery";

export function useRaineventQuery(field, options = {}) {
    const { enumText, title, column } = options;
    const label = isString(title) ? title : "";
    const col = column ?? 12;

    const { schema, setupEnums, setupValue } = useSearchSelect(field, {
        ui: {
            col,
            label,
            placeholder: "请选择降雨事件",
            multiple: false,
            collapseTags: false
        },
        value: "",
        valueField: "value",
        textField: "label",
        ...options
    });

    const setupSelectData = (data) => {
        const enums = data.filter(isObjectLike).map(formaterEnums(enumText));
        setupEnums(enums);
        setupValue("");
    }

    const setupSelectError = () => {
        setupEnums([]);
        setupValue("");
    }

    const setupSelectEnums = () => {
        return icmQueryRainfallEvent().then(setupSelectData).catch(setupSelectError);
    };

    return {
        raineventSelectSchema: schema,
        raineventSelectEnums: setupEnums,
        raineventSelectValue: setupValue,
        raineventSelectEnumSetup: setupSelectEnums
    }
}
