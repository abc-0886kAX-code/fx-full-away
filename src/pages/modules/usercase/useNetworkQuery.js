/*
 * @FilePath: \3D防汛作战\src\pages\modules\usercase\useNetworkQuery.js
 * @Author: zhangyang
 * @Date: 2022-07-04 11:00:23
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-05 09:34:06
 * @Description: 
 */
import stroe from "@/stroe";
import { isString, isObjectLike } from "lodash";
import { parseJson } from "@/utils/business";

import { useSearchSelect } from "@/composables/biz-search/useSearch";
import {
    icmQueryModuleNetwork,
    icmQueryModuleNetworkPlan,
} from "@/api/icm/query.api";

export const formaterEnums = (enumText) => (node) => {
    const label = node[enumText];
    const value = JSON.stringify(node);
    return { value, label }
}

// 根据模型网络获取对应网络方案联动
export async function setupNetworkDrivePlan(result) {
    stroe.dispatch("_cancelTagRequest", "IcmQuery");

    const { value } = result;
    try {
        const data = await icmQueryModuleNetworkPlan(JSON.parse(parseJson(value)));
        return data.map((node) => ({
            value: node,
            label: node
        }));
    } catch {
        return [];
    }
}

// 检索模型网络选择
export function useNetworkQuery(field, options = {}) {
    const { driveField, enumText, title, column } = options;
    const label = isString(title) ? title : "";
    const col = column ?? 12;

    const { schema, setupEnums, setupValue } = useSearchSelect(field, {
        leader: {
            [`setupNetworkDrivePlan.${driveField}`]: {
                controller: "dataSchema.enums"
            }
        },
        ui: {
            col,
            label,
            placeholder: "请选择模型网络",
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
        return icmQueryModuleNetwork().then(setupSelectData).catch(setupSelectError);
    }

    return {
        networkSelectSchema: schema,
        networkSelectEnums: setupEnums,
        networkSelectValue: setupValue,
        networkSelectEnumSetup: setupSelectEnums
    }
}

// 检索模型网络方案选择
export function useNetworkPlanQuery(field, options = {}) {
    const { title, column } = options;
    const label = isString(title) ? title : "";
    const col = column ?? 12;

    const { schema, setupEnums, setupValue } = useSearchSelect(field, {
        worker: [
            `setupNetworkDrivePlan.${field}`
        ],
        ui: {
            col,
            label,
            placeholder: "请选择模型网络方案",
            multiple: false,
            collapseTags: false
        },
        value: "",
        valueField: "value",
        textField: "label",
        ...options
    });

    return {
        networkPlanSchema: schema,
        networkPlanEnums: setupEnums,
        networkPlanValue: setupValue,
    }
}
