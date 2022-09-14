/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\usecase\useDataType.js
 * @Author: zhangyang
 * @Date: 2022-08-03 13:25:05
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-03 16:01:59
 * @Description: 
 */
import { provide, inject } from "@vue/composition-api";

import { EnumEntity } from "../../../entity/Enum";
import { DataTypeSymbolName } from "../../../shared/context";
import { DataTypeSelectProps } from "../../../shared/config";
import { setupEnumField } from "../../../shared/utils";

export function useDataTypeInject() {
    return inject(DataTypeSymbolName);
}

export function useDataType() {
    const [key] = Object.keys(DataTypeSelectProps);
    const output = setupEnumField("dataType", EnumEntity({ key, data: DataTypeSelectProps }));

    provide(DataTypeSymbolName, output);
    return output;
}

export default useDataType;
