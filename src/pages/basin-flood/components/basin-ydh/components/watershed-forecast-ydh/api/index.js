/*
 * @Author: zhangxin
 * @Date: 2022-06-20 16:54:40
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-20 16:55:41
 * @Description: 
 */
import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";

// 获取雨量站站点列表
export const getRainfallSiteList = () => send({
    tag: "RainfallSite",
    url: setUrl("/SW/PP/getRRSTCDList")
}).then(analysisResponse);
