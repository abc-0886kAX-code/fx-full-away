/*
 * @FilePath: \3D防汛作战\src\pages\modules\usercase\useInflowQuery.js
 * @Author: zhangyang
 * @Date: 2022-07-06 14:59:23
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-06 15:03:14
 * @Description: 
 */
import { isString, isObjectLike } from "lodash";

import { useSearchSelect } from "@/composables/biz-search/useSearch";
import { icmQueryInflowEvent } from "@/api/icm/query.api";
import { formaterEnums } from "./useNetworkQuery";

export function useInflowQuery(field, options = {}) {
    const { enumText, title, column } = options;
    const label = isString(title) ? title : "";
    const col = column ?? 12;

    const { schema, setupEnums, setupValue } = useSearchSelect(field, {
        ui: {
            col,
            label,
            placeholder: "请选择入流事件",
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
        return icmQueryInflowEvent().then(setupSelectData).catch(setupSelectError);
    };

    return {
        inflowSelectSchema: schema,
        inflowSelectEnums: setupEnums,
        inflowSelectValue: setupValue,
        inflowSelectEnumSetup: setupSelectEnums
    }
}
