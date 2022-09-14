/*
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-progress-query\usecase\useSubStatus.js
 * @Author: zhangyang
 * @Date: 2022-07-01 15:22:30
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-01 16:52:02
 * @Description: 
 */
import StatusEntity from "../entity/status";

export function useSubStatus(target) {
    const { success_substatus } = target;
    return StatusEntity(success_substatus);
}
