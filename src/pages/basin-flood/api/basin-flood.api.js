/*
 * @FilePath: \防汛大屏\src\pages\basin-flood\api\basin-flood.api.js
 * @Author: zhangyang
 * @Date: 2022-06-27 16:44:28
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-04 11:32:47
 * @Description:
 */

import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from '@/utils/business';

// 接口说明：防汛作战业务化应用平台-山洪防御
export const getBasinFloodChartsList = ({ TM }) =>
    send({
        url: setUrl('/SW/SSJC/getHYLSList'),
        params: { TM },
    }).then(analysisResponse);
