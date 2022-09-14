/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\shared\utils.js
 * @Author: zhangyang
 * @Date: 2022-08-03 15:27:00
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-03 15:56:25
 * @Description: 
 */
import { camelCase } from "lodash";

export function setupEnumField(field, props = {}) {
    const data = {};
    Object.keys(props).forEach((key) => {
        const name = camelCase(`${field}-${key}`);
        data[name] = props[key];
    });
    return data;
}
