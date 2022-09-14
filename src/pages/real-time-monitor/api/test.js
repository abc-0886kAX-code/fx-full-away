/*
 * @Author: zhangxin
 * @Date: 2022-07-05 19:57:23
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-19 10:40:14
 * @Description: 
 */
import { analysisResponse } from "@/utils/business";

const forecastData = {
    "msg": "success",
    "code": 200,
    "data": [
        {
            "forecastdata": 1.15,
            "tm": "2022-06-13 00",
            "realTimeData": 0.57
        },
        {
            "forecastdata": 8.94,
            "tm": "2022-06-13 01",
            "realTimeData": 0.02
        },
        {
            "forecastdata": 5.35,
            "tm": "2022-06-13 02",
            "realTimeData": 0
        },
        {
            "forecastdata": 3.2,
            "tm": "2022-06-13 03",
            "realTimeData": 0
        },
        {
            "forecastdata": 0.43,
            "tm": "2022-06-13 04",
            "realTimeData": 0.01
        },
        {
            "forecastdata": 0.04,
            "tm": "2022-06-13 05",
            "realTimeData": 0.06
        },
        {
            "forecastdata": 0.01,
            "tm": "2022-06-13 06",
            "realTimeData": 0.05
        },
        {
            "forecastdata": 0.02,
            "tm": "2022-06-13 07",
            "realTimeData": 0.08
        },
        {
            "forecastdata": 0.15,
            "tm": "2022-06-13 08",
            "realTimeData": 0.2
        },
        {
            "forecastdata": 0.3,
            "tm": "2022-06-13 09",
            "realTimeData": 0.24
        },
        {
            "forecastdata": 4.16,
            "tm": "2022-06-13 10",
            "realTimeData": 0.05
        }
    ]
}

// 预报数据图表接口
export const getForecastData = (params) => {
    console.log(params);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(forecastData)
        }, 3000);
    }).then(analysisResponse)

}

// 实时数据数据图表接口
export const getRealTimeData = (params) => {
    console.log(params);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(forecastData)
        }, 3000);
    }).then(analysisResponse)
}

const mockImgeUrl = {
    "code": 200,
    "data": {
        "prediction": "/UpFile/20220719102299image.png",
        "realtime": "/UpFile/20220719884336im11age.png"
    },
    "msg": "success"
}
const handleImgUrl = (data) => {
    const { prediction, realtime } = data;
    return {
        prediction: `${process.env.VUE_APP_IMG_HOST}${prediction}`,
        realtime: `${process.env.VUE_APP_IMG_HOST}${realtime}`
    }
}

// 降雨量对比图接口
export const getRainfallComparisonChart = (params) => {
    console.log(params);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockImgeUrl);
        }, 2000);
    }).then(analysisResponse).then(handleImgUrl)
}