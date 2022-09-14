/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\usecase\useImageType.js
 * @Author: zhangyang
 * @Date: 2022-08-03 13:29:44
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-04 15:11:02
 * @Description: 
 */
import { provide, inject } from "@vue/composition-api";

import { EnumEntity } from "../../../entity/Enum";
import { ImageTypeSymbolName } from "../../../shared/context";
import { ImageTypeSelectProps } from "../../../shared/config";
import { setupEnumField } from "../../../shared/utils";

export function useImageTypeInject() {
    return inject(ImageTypeSymbolName);
}

export function useImageType() {
    const [key] = Object.keys(ImageTypeSelectProps);
    const output = setupEnumField("imgType", EnumEntity({ key, data: ImageTypeSelectProps }));

    provide(ImageTypeSymbolName, output);
    return output;
}

export default useImageType;
