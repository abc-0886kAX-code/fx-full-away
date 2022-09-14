/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\api\threshold.api.js
 * @Author: zhangyang
 * @Date: 2022-08-04 11:27:06
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-04 11:27:13
 * @Description: 
 */
import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";

export const getWarnThresholdGeoJson = (params) => send({
    url: setUrl('/FloodPlan/getFloodStandardJson'),
    method: "POST",
    params
}).then(analysisResponse).catch(() => {
    return {}
});
