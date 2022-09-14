/*
 * @FilePath: \3D防汛作战\src\api\icm\run.api.js
 * @Author: zhangyang
 * @Date: 2022-07-04 14:26:29
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-06 15:12:57
 * @Description: 
 */
// 数据运行接口文件
import { send, setIcmUrl } from '@/plugins/axios';
import { analysisResponse, parseJson } from "@/utils/business";
import { default as format } from "date-fns/format";

const statusMapping = {
    "OK": "成功",
    "Warnings": "警告"
}

// 发起模拟
export const icmModuleStartup = (body) => {
    const {
        network,
        template,
        rainevent,
        waterlevel,
        inflowevent,
        transtion,
        startTime,
        endTime,
        runName,
        scenarioName,
        endDuration,
        duration,
        timeStep,
        resultsMultiplier,
    } = body;
    const { name: networkName } = JSON.parse(parseJson(network));
    const { path: templateName } = JSON.parse(parseJson(template));
    const { path: rainfall } = JSON.parse(parseJson(rainevent));
    const { path: level } = JSON.parse(parseJson(waterlevel));
    const { path: inflow } = JSON.parse(parseJson(inflowevent));
    const { path: regulator } = JSON.parse(parseJson(transtion));

    const data = {
        startTime: format(new Date(startTime), "yyyy/MM/dd HH:mm"),
        endTime: format(new Date(endTime), "yyyy/MM/dd HH:mm"),
        templateName,
        networkName,
        runName,
        scenarioName,
        endDuration,
        timeStep: Math.floor(timeStep * 60),
        resultsMultiplier,
        durationUnit: "Minutes"
    };
    if (rainfall) data.rainfall = rainfall;
    if (level) data.level = level;
    if (inflow) data.inflow = inflow;
    if (regulator) data.regulator = regulator;
    if (!endDuration) data.duration = duration;

    return send({
        url: setIcmUrl("/run/start"),
        method: "POST",
        data
    }).then(analysisResponse)
};

// 模型网络方案合理性检查
export const icmUsableModelNetwork = (params) => {
    const { network, scenarioName: scenario } = params;
    const { name } = JSON.parse(parseJson(network));
    return send({
        url: setIcmUrl("/network/validate"),
        method: "GET",
        params: {
            name,
            scenario
        }
    }).then(analysisResponse);
};

// 查询模拟列表
export const icmQuerySimulationList = () => send({
    url: setIcmUrl("/sim/list"),
    method: "GET",
}).then(analysisResponse).then(data => data.map(item => {
    item.success_substatus = statusMapping[item.success_substatus];
    return item;
}));

// 筛选可用模型状态
const filterUsableModel = (data) => {
    return data.filter((node) => {
        console.log(node);
        return true;
    });
};
// 查询模拟列表（仅限可用模型）
export const icmQueryUsableSimulation = () => icmQuerySimulationList().then(filterUsableModel);

// 查询指定模拟的详细信息
export const icmQuerySimulationListData = (params) => send({
    url: setIcmUrl("/sim"),
    method: "GET",
    params
}).then(analysisResponse)

// 查询模拟进度状态
export const icmQuerySimulationProgressStatus = (params) => send({
    url: setIcmUrl("/run/status"),
    method: "GET",
    params
}).then(analysisResponse);

// 区域统计接口
export const icmQueryRegionalStatisticsList = (params) => send({
    url: setIcmUrl("/statistic/region"),
    method: "GET",
    params
}).then(analysisResponse);

// 模拟解说动态变化-地图渲染
export const icmQueryMapRenderData = (params) => send({
    url: setIcmUrl("/map/render"),
    method: "GET",
    params,
    tag: "mapRender"
}).then(res => res.code);
