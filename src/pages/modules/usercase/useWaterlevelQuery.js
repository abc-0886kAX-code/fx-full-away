/*
 * @FilePath: \3D防汛作战\src\pages\modules\usercase\useWaterlevelQuery.js
 * @Author: zhangyang
 * @Date: 2022-07-04 15:13:33
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-06 14:59:56
 * @Description: 
 */
import { isString, isObjectLike } from "lodash";

import { useSearchSelect } from "@/composables/biz-search/useSearch";
import { icmQueryWaterLevelEvent } from "@/api/icm/query.api";
import { formaterEnums } from "./useNetworkQuery";

export function useWaterlevelQuery(field, options = {}) {
    const { enumText, title, column } = options;
    const label = isString(title) ? title : "";
    const col = column ?? 12;

    const { schema, setupEnums, setupValue } = useSearchSelect(field, {
        ui: {
            col,
            label,
            placeholder: "请选择水位事件",
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
        return icmQueryWaterLevelEvent().then(setupSelectData).catch(setupSelectError);
    }

    return {
        waterlevelSelectSchema: schema,
        waterlevelSelectEnums: setupEnums,
        waterlevelSelectValue: setupValue,
        waterlevelSelectEnumSetup: setupSelectEnums
    }
}
