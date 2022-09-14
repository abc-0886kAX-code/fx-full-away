/*
 * @FilePath: \防汛大屏\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\api\common.api.js
 * @Author: zhangyang
 * @Date: 2022-08-04 16:25:48
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-08 16:31:16
 * @Description:
 */
import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from '@/utils/business';

// 人工数据清除
export const clearManualData = () =>
    send({
        url: setUrl('/FloodPlan/getDelManualRain'),
        method: 'POST',
    });

// 人工数据保存
export const saveManualData = params =>
    send({
        url: setUrl('/FloodPlan/getSaveManualRain'),
        method: 'POST',
        params,
    }).then(analysisResponse);

// 人工数据获取列表
export const getManualDataList = () =>
    send({
        url: setUrl('/FloodPlan/getManualDangerData'),
        method: 'POST',
    }).then(analysisResponse);

// 人工数据获取站点
export const getManualData = params =>
    send({
        url: setUrl('/FloodPlan/getManualDangerData'),
        method: 'POST',
        params,
    }).then(analysisResponse);

// 人工数据删单个站点数据
export const deleteManualData = params =>
    send({
        url: setUrl('/FloodPlan/delManualDangerData'),
        method: 'POST',
        params,
    }).then(analysisResponse);

// 导出风险区域村庄表
export const exportDangerSite = params =>
    send({
        url: setUrl('/FloodPlan/getDangerSiteExcel'),
        method: 'POST',
        params,
    });
