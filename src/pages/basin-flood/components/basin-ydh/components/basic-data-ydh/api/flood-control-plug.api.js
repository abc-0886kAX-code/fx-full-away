/*
 * @FilePath: \3D防汛作战\src\pages\basin-flood\components\basin-cbh\components\basic-data-cbh\api\flood-control-plug.api.js
 * @Author: zhangyang
 * @Date: 2022-06-17 12:29:14
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-21 09:58:40
 * @Description: 
 */
import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";

// 获取防洪堵口列表
export const getFloodControlPlugList = (params = {}) => send({
    tag: "FloodControlPlug",
    url: setUrl("/SW/FCP/getFCPList"),
    params
}).then(analysisResponse);

// 获取防洪堵口详情
export const getFloodControlPlugDetails = (params) => send({
    tag: "FloodControlPlugDetails",
    url: setUrl("/SW/FCP/getFCPInfo"),
    params
}).then(analysisResponse)