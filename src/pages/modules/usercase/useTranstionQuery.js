/*
 * @FilePath: \3D防汛作战\src\pages\modules\usercase\useTranstionQuery.js
 * @Author: zhangyang
 * @Date: 2022-07-04 15:16:22
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-05 09:34:15
 * @Description: 
 */
import { isString, isObjectLike } from "lodash";

import { useSearchSelect } from "@/composables/biz-search/useSearch";
import { icmQueryTranstionEvent } from "@/api/icm/query.api";
import { formaterEnums } from "./useNetworkQuery";

export function useTranstionQuery(field, options = {}) {
    const { enumText, title, column } = options;
    const label = isString(title) ? title : "";
    const col = column ?? 12;

    const { schema, setupEnums, setupValue } = useSearchSelect(field, {
        ui: {
            col,
            label,
            placeholder: "请选择调节器事件",
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
        return icmQueryTranstionEvent().then(setupSelectData).catch(setupSelectError);
    }

    return {
        transtionSelectSchema: schema,
        transtionSelectEnums: setupEnums,
        transtionSelectValue: setupValue,
        transtionSelectEnumSetup: setupSelectEnums
    }
}
