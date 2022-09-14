/*
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-progress-query\usecase\usePath.js
 * @Author: zhangyang
 * @Date: 2022-07-01 15:29:54
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-01 15:38:59
 * @Description: 
 */
import { compact } from "lodash";

export function usePath(target) {
    const { path } = target;
    const pathcase = path ?? "";

    return compact(pathcase.split(">"));
}
