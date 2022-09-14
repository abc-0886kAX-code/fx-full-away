/*
 * @Author: zhangxin
 * @Date: 2022-06-21 13:42:25
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-27 15:10:47
 * @Description: 
 */

import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";

// 接口说明：防汛作战业务化应用平台-山洪防御
export const getSHFYList = () => send({
    url: setUrl('/SW/SSJC/getSHFYList')
}).then(analysisResponse);