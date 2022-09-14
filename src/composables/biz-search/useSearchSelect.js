/*
 * @FilePath: \3D防汛作战\src\composables\biz-search\useSearchSelect.js
 * @Author: zhangyang
 * @Date: 2022-07-04 14:24:44
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-12 17:22:43
 * @Description: 
 */
import { onMounted } from "@vue/composition-api";
import { isString } from "lodash";

import { useSearchSelect } from "@/composables/biz-search/useSearch";
import { districtTypeGet } from "@/api/common.api";

export function usesUpperAndLowerBasins(field, options = {}) {
    const { title, column } = options;
    const label = isString(title) ? title : "";
    const col = column ?? 12;

    const { schema, setupEnums, setupValue } = useSearchSelect(field, {
        ui: {
            col,
            label,
            placeholder: "请选择上下游流域",
            multiple: false,
            collapseTags: false
        },
        enums: [
            {
                value: "up",
                label: "上游"
            },
            {
                value: "down",
                label: "下游"
            }
        ],
        value: "",
        valueField: "value",
        textField: "label",
        ...options
    });

    return {
        upperAndLowerSchema: schema,
        upperAndLowerSetupEnums: setupEnums,
        upperAndLowerSetupValue: setupValue
    }
}

export function useWhetherOrNot(field, options = {}) {
    const { title, tips, column } = options;
    const label = isString(title) ? title : "";
    const col = column ?? 12;

    const { schema, setupEnums, setupValue } = useSearchSelect(field, {
        ui: {
            col,
            label,
            placeholder: tips ?? "请选择是或否",
            multiple: false,
            collapseTags: false
        },
        enums: [
            {
                value: true,
                label: "是"
            },
            {
                value: false,
                label: "否"
            }
        ],
        value: false,
        valueField: "value",
        textField: "label",
        ...options
    });

    return {
        whetherOrNotSchema: schema,
        whetherOrNotSetupEnums: setupEnums,
        whetherOrNotSetupValue: setupValue
    }
}

// 模板类型选择器
export function useTemplateType(field, options = {}) {
    const { title, tips, column } = options;
    const label = isString(title) ? title : "";
    const col = column ?? 12;

    const { schema, setupEnums, setupValue } = useSearchSelect(field, {
        ui: {
            col,
            label,
            placeholder: tips ?? "请选择模板类型",
            multiple: false,
            collapseTags: false
        },
        enums: [
            {
                value: "rain",
                label: "雨量模板"
            },
            {
                value: "level",
                label: "水位模板"
            },
            {
                value: "inflow",
                label: "入流模板"
            }
        ],
        value: "",
        valueField: "value",
        textField: "label",
        ...options
    });

    return {
        templateTypeSchema: schema,
        templateTypeSetupEnums: setupEnums,
        templateTypeSetupValue: setupValue
    }
}

// 区县选择器
export function useCountySelect(field, options = {}) {
    const { title, col } = options;
    // const multiple = isBoolean(isMany) ? isMany : true;
    const label = isString(title) ? title : "";

    const { schema, setupEnums, setupValue } = useSearchSelect(field, {
        ui: {
            col: col ?? 12,
            label,
            placeholder: "选择所在区县",
            multiple: false,
            collapseTags: true
        },
        // value: multiple ? [] : "",
        value: "",
        valueField: "code",
        textField: "description",
        ...options
    });

    const setupSelectData = (response) => {
        setupEnums(response);
        setupValue("");
    }
    const setupSelectError = () => {
        setupEnums([]);
        setupValue("");
    };

    onMounted(() => {
        districtTypeGet().then(setupSelectData).catch(setupSelectError);
    });

    return {
        countySelectSchema: schema,
        countySelectSetupEnums: setupEnums,
        countySelectSetupValue: setupValue
    }
}
