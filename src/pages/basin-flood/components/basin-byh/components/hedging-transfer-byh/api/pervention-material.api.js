/*
 * @Author: zhangxin
 * @Date: 2022-06-17 15:05:18
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-20 13:48:40
 * @Description: 
 */
import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";

// 获取防汛物质点位列表
export const getPreventionMaterialList = () => send({
    tag: "PreventionMaterial",
    url: setUrl("/SW/WH/getWHList"),
    method: 'POST',
}).then(analysisResponse);


// 获取转移安置点位列表
export const getPreventionTransferList = () => send({
    tag: "PreventionTransfer",
    url: setUrl("/SW/TF/getTFList"),
    method: 'POST',
}).then(analysisResponse);


// 获取防汛队伍点位列表
export const getRescueRanksList = () => send({
    tag: "RescueRanks",
    url: setUrl("/SW/RT/getRTList"),
    method: 'POST',
    params: { tp: "FX" }
}).then(analysisResponse);


// 获取水利队伍点位列表
export const getWaterConservancyRanksList = () => send({
    tag: "WaterConservancyRanks",
    url: setUrl("/SW/RT/getRTList"),
    method: 'POST',
    params: { tp: "SL" }
}).then(analysisResponse);
