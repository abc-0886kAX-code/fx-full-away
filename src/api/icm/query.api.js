/*
 * @FilePath: \3D防汛作战\src\api\icm\query.api.js
 * @Author: zhangyang
 * @Date: 2022-06-30 10:09:14
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-11 10:19:28
 * @Description: 
 */
import { send, setIcmUrl } from '@/plugins/axios';
import { analysisResponse, parseJson } from "@/utils/business";
import { transformIcmDataSource, icmEventQueryPocket, icmEventQuerySort } from "./business";

// 模型网络查询
export const icmQueryModuleNetwork = (params) => send({
    url: setIcmUrl("/event/list/network"),
    method: "GET",
    tag: "IcmQuery"
}).then(analysisResponse).then(icmEventQueryPocket).then(icmEventQuerySort(params ?? { order: "desc", prop: "id" }));

// 模型网络方案查询
export const icmQueryModuleNetworkPlan = (params) => {
    const { id: networkId } = params;

    return send({
        url: setIcmUrl("/event/list/scenario"),
        method: "GET",
        tag: "IcmQuery",
        params: {
            networkId
        }
    }).then(analysisResponse);
};

// 降雨事件查询
export const icmQueryRainfallEvent = (params) => send({
    url: setIcmUrl("/event/list/rain"),
    method: "GET",
    tag: "IcmQuery",
}).then(analysisResponse).then(icmEventQueryPocket).then(icmEventQuerySort(params ?? { order: "desc", prop: "id" }));

// 水位事件查询
export const icmQueryWaterLevelEvent = (params) => send({
    url: setIcmUrl("/event/list/level"),
    method: "GET",
    tag: "IcmQuery",
}).then(analysisResponse).then(icmEventQueryPocket).then(icmEventQuerySort(params ?? { order: "desc", prop: "id" }));

// 入流事件查询
export const icmQueryInflowEvent = (params) => send({
    url: setIcmUrl("/event/list/inflow"),
    method: "GET",
    tag: "IcmQuery",
}).then(analysisResponse).then(icmEventQueryPocket).then(icmEventQuerySort(params ?? { order: "desc", prop: "id" }));

// 调节器事件查询
export const icmQueryTranstionEvent = (params) => send({
    url: setIcmUrl("/event/list/regulator"),
    method: "GET",
    tag: "IcmQuery",
}).then(analysisResponse).then(icmEventQueryPocket).then(icmEventQuerySort(params ?? { order: "desc", prop: "id" }));

// 运行模板查询
export const icmQueryRunTemplate = (params) => send({
    url: setIcmUrl("/event/list/template"),
    method: "GET",
    tag: "IcmQuery",
}).then(analysisResponse).then(icmEventQueryPocket).then(icmEventQuerySort(params ?? { order: "desc", prop: "id" }));

// 降雨数据查询
export const icmQueryRainfallData = (params) => send({
    url: setIcmUrl("/rainfall"),
    method: "GET",
    tag: "IcmQuery",
    params
}).then(analysisResponse).then(transformIcmDataSource);

// 水位数据查询
export const icmQueryWaterLevelData = (params) => send({
    url: setIcmUrl("/level"),
    method: "GET",
    tag: "IcmQuery",
    params
}).then(analysisResponse).then(transformIcmDataSource);

// 调节器数据查询
export const icmQueryTranstionData = (params) => send({
    url: setIcmUrl("/regulator"),
    method: "GET",
    tag: "IcmQuery",
    params
}).then(analysisResponse).then(transformIcmDataSource);

// 模拟进度状态查询
export const icmQueryModuleProgress = (params) => {
    const { id: simId } = params;

    return send({
        url: setIcmUrl("/run/status"),
        method: "GET",
        tag: "IcmQuery",
        params: {
            simId
        }
    }).then(analysisResponse);
}

// 网络上下游追踪
export const icmQueryModuleNetworkTrace = (params) => {
    const { network, scenario, type } = params;
    const {
        name: networkName,
    } = JSON.parse(parseJson(network));

    return send({
        url: setIcmUrl("/network/tracking"),
        method: "POST",
        tag: "IcmQuery",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: {
            nodeId: "pb01",
            networkName,
            scenario,
            type
        }
    });
}
