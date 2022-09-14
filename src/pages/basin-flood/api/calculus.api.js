/*
 * @FilePath: \3D防汛作战\src\pages\basin-flood\api\calculus.api.js
 * @Author: zhangyang
 * @Date: 2022-07-05 18:12:24
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-06 10:18:21
 * @Description: 
 */
import { getNowTime } from "@/composables/biz-search/share";
import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";
// import { default as addHours } from "date-fns/addHours";
// import { default as format } from "date-fns/format";



// 提交自定义演算数据
export const startupCalculusForm = (params) => {
    const { tm } = params;
    const [date, time] = tm.split(" ");
    const formatDate = date.split("-").join("");
    const [formatTime] = time.split(":");
    return send({
        url: setUrl('/CalculusModel/CalculationModelCalculus'),
        method: 'POST',
        params: {
            ...params,
            tm: formatDate + formatTime
        }
    });
};

// 接口说明：获取演算结果。
export const getModelResultData = (params) => send({
    url: setUrl('/CalculusModel/getModelResultData'),
    method: 'POST',
    params
}).then(analysisResponse).catch(err => {
    return new Promise((resolve) => {
        resolve([{
            maxtm: 0,
            area: 0,
            flood_peak: 0,
            flood: 0,
            k: 0,
            maxflood: "",
            maxflood_peak: "",
            county: "",
            tm: "",
            times: getNowTime(),
            flows: [],
            rains: []
        }])
    })
})

// 格式化日期时间

// .then(hanlderTimeFormat)

// const hanlderTimeFormat = (data) => {
//     const [response] = data;
//     response.flows = response.flows.map(item => {
//         item.flowid = format(addHours(new Date(response.times), item.flowid), "yyyy-MM-dd HH:mm:ss");
//         return item;
//     });
//     return [response];
// }