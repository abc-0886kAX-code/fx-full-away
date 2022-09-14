/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\api\level.api.js
 * @Author: zhangyang
 * @Date: 2022-08-04 15:16:03
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-04 15:21:41
 * @Description: 
 */
import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";

// 预报数据 风险等级图 Json
export const getForecastWarnLevelGeoJson = (params) => send({
    url: setUrl('/FloodPlan/getFloodJson'),
    method: "POST",
    params: {
        jsontype: `${params.type}5`
    }
}).then(analysisResponse);

// 实测数据 风险等级图 Json
export const getActualWarnLevelGeoJson = (params) => send({
    url: setUrl("/FloodPlan/getRealRainDataFXDJJson"),
    method: "POST",
    params: {
        jsontype: params.type
    }
}).then(analysisResponse);

// 人工测绘 风险等级图 Json
export const getManualWarnLevelGeoJson = (params) => send({
    url: setUrl("/FloodPlan/getManualRainDataFXDJJson"),
    method: "POST",
    params: {
        jsontype: params.type
    }
}).then(analysisResponse);
