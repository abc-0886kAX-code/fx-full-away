/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\usecase\useWarnArea.js
 * @Author: zhangyang
 * @Date: 2022-08-08 10:00:29
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 11:06:02
 * @Description: 
 */
import { computed, unref } from "@vue/composition-api";
import { useForecastArea } from "./useForecastArea";
import { useActualArea } from "./useActualArea";
import { useManualArea } from "./useManualArea";

import { useDataTypeInject } from "./useDataType";

const biz = {
    forecast: useForecastArea,
    actual: useActualArea,
    manual: useManualArea
};

export function useWarnArea() {
    const { dataTypeKey } = useDataTypeInject();
    const hasManual = computed(() => unref(dataTypeKey) === "manual");
    const useBusiness = computed(() => biz[unref(dataTypeKey)]);

    return {
        hasManual,
        useBusiness
    }
}

export default useWarnArea;
