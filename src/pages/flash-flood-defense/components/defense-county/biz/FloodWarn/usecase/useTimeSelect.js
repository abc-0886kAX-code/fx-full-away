/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\usecase\useTimeSelect.js
 * @Author: zhangyang
 * @Date: 2022-08-03 13:21:24
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-03 16:02:31
 * @Description: 
 */
import { provide, inject } from "@vue/composition-api";

import { EnumEntity } from "../../../entity/Enum";
import { TimeSelectSymbolName } from "../../../shared/context";
import { TimeSelectProps } from "../../../shared/config";
import { setupEnumField } from "../../../shared/utils";

export function useTimeSelectInject() {
    return inject(TimeSelectSymbolName);
}

export function useTimeSelect() {
    const [key] = Object.keys(TimeSelectProps);
    const output = setupEnumField("timeSelect", EnumEntity({ key, data: TimeSelectProps }));

    provide(TimeSelectSymbolName, output);
    return output;
}

export default useTimeSelect;
