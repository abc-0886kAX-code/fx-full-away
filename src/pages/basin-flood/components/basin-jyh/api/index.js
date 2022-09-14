/*
 * @Author: zhangxin
 * @Date: 2022-06-16 16:29:59
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-28 17:26:26
 * @Description: 
 */
import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";


// 获取雨量站弹框图表数据
export const getChartsData = (params) => send({
    url: setUrl('/SW/PP/getFloodList'),
    method: 'POST',
    params
}).then(analysisResponse)

// 获取雨量站站点权重列表
export const getSiteWeightList = (params) => send({
    url: setUrl('/SW/PP/getST_RR_STCDList'),
    params
}).then(analysisResponse)

// 接口说明：按流域获取水库信息
export const getReservoirSiteByUser = ({ hnnm }) => send({
    url: setUrl('/FloodPlan/getReservoirSiteByUser'),
    method: 'POST',
    params: { hnnm }
}).then(analysisResponse)

// 获取潮白河水库详情信息 前三个tbas标签
export const getReservoirSiteFrontDetails = ({ stcd }) => send({
    url: setUrl('/FloodPlan/getFloodPlanList'),
    method: 'POST',
    params: { stcd }
}).then(analysisResponse).then(data => {
    return data[0]
})

// 获取潮白河水库详情信息 后面个tbas标签
export const getReservoirSiteBehindDetails = ({ stcd, lxid }) => send({
    url: setUrl('/FloodPlan/getFloodPlanEnclosureList'),
    method: 'POST',
    params: { stcd, lxid }
}).then(analysisResponse)

// 接口说明：获取物资仓库站点信息
export const getWHInfo = ({ stcd }) => send({
    url: setUrl('/SW/WH/getWHInfo'),
    params: { stcd }
}).then(analysisResponse)

// 接口说明：获取物资仓库站点数据表格
export const getMTList = ({ stcd }) => send({
    url: setUrl('/SW/MT/getMTList'),
    method: 'POST',
    params: { stcd }
}).then(analysisResponse)

// 接口说明：获取物资仓库站点信息
export const getRTInfo = ({ id, tp }) => send({
    url: setUrl('/SW/RT/getRTInfo'),
    method: 'POST',
    params: { id, tp }
}).then(analysisResponse)



// 接口说明：转移安置点位详情
// params: { stcd: 59, tp: 'SH' }
export const getHYTPVillageDetails = (params) => send({
    url: setUrl('/ST/STC/getHYTPVillageDetails'),
    params
}).then(analysisResponse)

// 接口说明：根据水库站点获取基础信息。
export const getFloodPlanList = ({ stcd }) => send({
    url: setUrl('/FloodPlan/getFloodPlanList'),
    method: 'POST',
    params: { stcd }
}).then(analysisResponse)

