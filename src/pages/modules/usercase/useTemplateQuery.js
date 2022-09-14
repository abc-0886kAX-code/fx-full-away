/*
 * @FilePath: \3D防汛作战\src\pages\modules\usercase\useTemplateQuery.js
 * @Author: zhangyang
 * @Date: 2022-07-06 14:59:31
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-11 10:14:42
 * @Description: 
 */
import { isString, isObjectLike } from "lodash";

import { useSearchSelect } from "@/composables/biz-search/useSearch";
import { icmQueryRunTemplate } from "@/api/icm/query.api";
import { formaterEnums } from "./useNetworkQuery";

export function useTemplateQuery(field, options = {}) {
    const { enumText, title, column } = options;
    const label = isString(title) ? title : "";
    const col = column ?? 12;

    const { schema, setupEnums, setupValue } = useSearchSelect(field, {
        ui: {
            col,
            label,
            placeholder: "请选择运行模板",
            multiple: false,
            collapseTags: false
        },
        value: "",
        valueField: "value",
        textField: "label",
        ...options
    });

    const setupSelectData = (data) => {
        console.log(data);
        const enums = data.filter(isObjectLike).map(formaterEnums(enumText));
        setupEnums(enums);
        setupValue("");
    }

    const setupSelectError = () => {
        setupEnums([]);
        setupValue("");
    }

    const setupSelectEnums = () => {
        return icmQueryRunTemplate().then(setupSelectData).catch(setupSelectError);
    };

    return {
        templateSelectSchema: schema,
        templateSelectEnums: setupEnums,
        templateSelectValue: setupValue,
        templateSelectEnumSetup: setupSelectEnums
    }
}
