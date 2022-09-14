/*
 * @Author: maggot-code
 * @Date: 2022-05-23 17:11:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-21 13:51:28
 * @Description: file content
 */
import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";
import { default as format } from "date-fns/format";
import { flake } from 'maggot-utils';

//时间格式为24小时制 HH
const handlerTimeFormat = (tm) => {
    if (tm) {
        return {
            tm: format(new Date(tm), "yyyyMMddHH")
        }
    }
    return { tm: format(new Date(), "yyyyMMddHH") }

}


const setupParams = (index, params) => {
    const options = {
        tm: params,
        h: index + 1
    }
    return getitemHourRainfallForecast(options);
}

const getGroupRequest = (params) => {
    const STEP = 24;
    const GROUP = []
    for (let index = 0; index < STEP; index++) {
        GROUP.push(setupParams(index, params))
    }
    return GROUP;
}


const getitemHourRainfallForecast = (params) => send({
    url: setUrl('/SW/PP/getHour'),
    params
})


// id: flake.gen()
const setupData = ({ data }) => {
    const { date } = data;
    return {
        ...data,
        id: flake.gen(),
        time: date
    }
};
export const getRainfallForecastMapData = async (params) => {
    const result = await Promise.allSettled(getGroupRequest(params.starttime));
    return result.filter(item => item.status === 'fulfilled').map(item => item.value).sort((a, b) => a.hour - b.hour).map(setupData);
};

// 降雨预报图表数据
export const getRainfallForecastChartData = (params) => send({
    tag: "prediction",
    url: setUrl('/SW/grib2/getJSYB'),
    params: handlerTimeFormat(params)
}).then(analysisResponse).catch(err => {
    console.log(err);
    return [];
})

// 实时降雨图表数据
export const getRainfallRealtimeChartData = () => send({
    tag: "prediction",
    url: setUrl('/SW/grib2/getSSPJ'),
}).then(analysisResponse);

// 降雨开始时间
export const getRainfallStartData = () => send({
    tag: "prediction",
    url: setUrl('/SW/PP/getST'),
}).then(analysisResponse);
// export const getRainfallStartData = () => Promise.resolve(RainfallStartJson.data);

// 雨峰时间
export const getRainfallPeakData = () => send({
    tag: "prediction",
    url: setUrl('/SW/PP/getMT'),
}).then(analysisResponse);
// export const getRainfallPeakData = () => Promise.resolve(RainfallPeakJson.data);

// 累计雨量 - 图例以及等值面图
export const getRainfallPileupData = () => send({
    tag: "prediction",
    url: setUrl('/SW/PP/getSD'),
}).then(analysisResponse);
// export const getRainfallPileupData = () => Promise.resolve(RainfallPileupJson.data);

// 累计雨量 - 图表
export const getRainfallPileupChartData = ({ st, et }) => send({
    tag: "prediction",
    url: setUrl('/SW/PP/getDB'),
    params: { st, et }
}).then(analysisResponse);

// 最大小时雨强
export const getRainfallMaxHourData = () => send({
    tag: "prediction",
    url: setUrl('/SW/PP/getMD'),
}).then(analysisResponse);
// export const getRainfallMaxHourData = () => Promise.resolve(RainfallMaxHourJson.data);

// 预报小时平均降雨
const hash = {};
export const getRainfallAvgHourData = () => send({
    tag: "prediction",
    url: setUrl('/SW/PP/getAVG'),
}).then(analysisResponse).then((data) => {
    return data.reduce((result, next) => {
        const { tm } = next;
        hash[tm] ? false : hash[tm] = true && result.push(next);
        return result;
    }, []);
});
// export const getRainfallAvgHourData = () => Promise.resolve(RainfallAvgHourJson.data);

// 雷达图
export const getRadarEchoMapData = (params) => send({
    tag: "prediction",
    method: 'POST',
    url: setUrl("/SW/PIC/LDT_List"),
    params
}).then(analysisResponse);
// export const getRadarEchoMapData = (params) => new Promise((resolve) => {
//     console.log(params);
//     setTimeout(() => {
//         resolve(RadarEachoMapJson)
//     }, 3000);
// });
