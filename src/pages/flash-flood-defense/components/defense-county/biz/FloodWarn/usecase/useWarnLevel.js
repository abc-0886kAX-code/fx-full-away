/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\usecase\useWarnLevel.js
 * @Author: zhangyang
 * @Date: 2022-08-04 15:28:48
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-04 15:33:26
 * @Description: 
 */
import { computed, unref } from "@vue/composition-api";
import { useForecastLevel } from "./useForecastLevel";
import { useActualLevel } from "./useActualLevel";
import { useManualLevel } from "./useManualLevel";

import { useDataTypeInject } from "./useDataType";

const biz = {
    forecast: useForecastLevel,
    actual: useActualLevel,
    manual: useManualLevel
};

export function useWarnLevel() {
    const { dataTypeKey } = useDataTypeInject();
    const useBusiness = computed(() => biz[unref(dataTypeKey)]);

    return {
        useBusiness
    }
}

export default useWarnLevel;
