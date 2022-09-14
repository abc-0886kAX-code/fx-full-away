/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\api\area.api.js
 * @Author: zhangyang
 * @Date: 2022-08-08 09:52:19
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 13:18:43
 * @Description: 
 */
import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";

// 接口说明：获取山洪预警危险村庄。
export const getDangerVillageData = (params) => send({
    url: setUrl('/FloodPlan/getDangerVillageData'),
    method: "POST",
    params: {
        dangertype: params.type
    }
}).then(analysisResponse)

// 预报数据 风险区域图 Json
export const getForecastWarnAreaGeoJson = (params) => send({
    url: setUrl('/FloodPlan/getFloodJson'),
    method: "POST",
    params: {
        jsontype: params.type
    }
}).then(analysisResponse);

// 预报数据 风险区域图 导出报表
export const getForecastDataExport = (params) => send({
    url: setUrl("/FloodPlan/getFloodReleaseWord"),
    method: "POST",
    params
}).then(analysisResponse);

// 实测数据 风险区域图表格
export const getActualWarnAreaTableData = (params) => send({
    url: setUrl("/FloodPlan/getRealDangerVillageData"),
    method: "POST",
    params: {
        dangertype: params.type
    }
}).then(analysisResponse);

// 实测数据 风险区域图 Json
export const getActualWarnAreaGeoJson = (params) => send({
    url: setUrl("/FloodPlan/getRealRainDataFXQYJson"),
    method: "POST",
    params: {
        jsontype: params.type
    }
}).then(analysisResponse);

// 实测数据 风险区域图 导出报表
export const getActualVillageDataExport = (params) => send({
    url: setUrl("/FloodPlan/getRealDangerVillageDataWord"),
    method: "POST",
    params
}).then(analysisResponse);

// 人工数据 风险区域图 Json
export const getManualWarnAreaGeoJson = (params) => send({
    url: setUrl("/FloodPlan/getManualRainDataFXQYJson"),
    method: "POST",
    params: {
        jsontype: params.type
    }
}).then(analysisResponse);

// 人工数据 风险区域图表格
export const getManualWarnAreaTableData = (params) => send({
    url: setUrl("/FloodPlan/getManualDangerVillageData"),
    method: "POST",
    params: {
        dangertype: params.type
    }
}).then(analysisResponse);

// 人工数据 风险区域图 导出报表
export const getManualVillageDataExport = (params) => send({
    url: setUrl("/FloodPlan/getManualFloodReleaseWord"),
    method: "POST",
    params
}).then(analysisResponse);
