/*
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-progress-query\usecase\useStatus.js
 * @Author: zhangyang
 * @Date: 2022-07-01 15:22:19
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-01 16:51:54
 * @Description: 
 */
import StatusEntity from "../entity/status";

export function useStatus(target) {
    const { status } = target;
    return StatusEntity(status);
}
