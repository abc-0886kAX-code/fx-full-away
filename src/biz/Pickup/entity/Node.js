/*
 * @FilePath: \3D防汛作战\src\biz\Pickup\entity\Node.js
 * @Author: zhangyang
 * @Date: 2022-06-16 16:26:36
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-16 17:59:20
 * @Description: 
 */
import { flake } from "maggot-utils";

export function setupNodeId(id) {
    const value = id ?? flake.gen();
    return value;
}

export function setupLabel(label) {
    const value = label ?? "节点";
    return value;
}

export default {
    id: setupNodeId(),
    label: setupLabel(),
}
