/*
 * @Author: zhangxin
 * @Date: 2022-05-23 16:44:28
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-10 14:11:46
 * @Description:
 */
import { send, setUrl } from '@/plugins/axios';
import { analysisResponse, filterTrendStatus, setupDataSourceExtends } from '@/utils/business';
import format from 'date-fns/format';

const alias = {
    differwarn: 'differWarning',
    hourTime: 'hourTimeWarning',
    rzAndTrend: 'rzAndTrendWarning',
    q: 'qWarning',
    w: 'wWarning',
};

const handlerDefferWarning = item => {
    let dataSource = {};
    if (item.differwarn > 0) {
        for (const key in item) {
            dataSource[alias[key]] = `<p style="color:red">${item[key]}</p>`;
        }
    } else {
        for (const key in item) {
            dataSource[alias[key]] = `${item[key]}`;
        }
    }
    return {
        ...dataSource,
        ...item,
    };
};

// 处理趋势格式问题
const formatterTrend = item => {
    const { trend, rz, z } = item;
    return {
        rzAndTrend: `${rz || z || '--'} ${filterTrendStatus(trend)}`,
    };
};

// 处理日期格式问题
// new Date(item.tm)会返回 "Invalid Date" , isDate传入返回"Invalid Date"的日期对象 也会判定为true
const formatterDataDate = item => {
    const time =
        item.tm !== '' && new Date(item.tm) !== 'Invalid Date' ? new Date(item.tm) : Date.now();
    return {
        hourTime: format(time, 'HH:mm'),
    };
};

//时间排序
const sortByTime = data => {
    // return data.sort((a, b) => {
    //     return a.tm < b.tm ? 1 : -1;
    // })
    return data;
};

// 实时监测 - 获取视频监控点位数据
export const getMFRVList = () =>
    send({
        url: setUrl('/SW/MFRV/getMFRVList'),
    }).then(analysisResponse);

// 接口说明：获取雨量站基本信息和时段内累计降水量列表，默认当天。
export const getRainTotalDataListt = ({ endtime = '', starttime = '', stnm = '' }) =>
    send({
        url: setUrl('/realData/getRainTotalDataList'),
        method: 'POST',
        params: { endtime, starttime, stnm },
    })
        .then(analysisResponse)
        .then(setupDataSourceExtends([formatterDataDate]));

// 接口说明：获取雨量站监测数据列表
export const getRainDataList = params =>
    send({
        url: setUrl('/realData/getRainDataList'),
        method: 'POST',
        params,
    }).then(analysisResponse);

// 接口说明：防汛作战业务化应用平台-实时监测-水库水位、库容
export const getSSJCList = ({ stcd }) =>
    send({
        url: setUrl('/SW/SSJC/getSSJCList'),
        params: { stcd },
    }).then(analysisResponse);

// 获取河道站基本信息和最新数据列表
export const getRiverNewDataList = params =>
    send({
        url: setUrl('/realData/getRiverNewDataList'),
        method: 'POST',
        params,
    })
        .then(analysisResponse)
        .then(setupDataSourceExtends([formatterDataDate, formatterTrend]))
        .then(data => data.map(handlerDefferWarning));

// 接口说明：获取河道站监测数据列表
export const getRiverDataList = params =>
    send({
        url: setUrl('/realData/getRiverDataList'),
        method: 'POST',
        params,
    }).then(analysisResponse);

// 接口说明：获取水库站基本信息和最新数据列表
export const getRsvrNewDataList = params =>
    send({
        url: setUrl('/realData/getRsvrNewDataList'),
        method: 'POST',
        params,
    })
        .then(analysisResponse)
        .then(setupDataSourceExtends([formatterDataDate, formatterTrend]))
        .then(data => data.map(handlerDefferWarning));

// 接口说明：获取水库站监测数据列表
export const getRsvrDataList = params =>
    send({
        url: setUrl('/realData/getRsvrDataList'),
        method: 'POST',
        params,
    }).then(analysisResponse);

// 接口说明：按类型获取场次降雨量数据
export const getSiteRainfallByType = params =>
    send({
        url: setUrl('/realData/getSiteRainfallByType'),
        method: 'POST',
        params,
    }).then(analysisResponse);

// 实时监测默认标签接口
// 业务需求，只取前四个数据
const getOnlyTopFour = data => data.slice(0, 4);
export const getReservoirTabs = () =>
    send({
        url: setUrl('/realData/getAddvcditem'),
        method: 'POST',
    })
        .then(analysisResponse)
        .then(getOnlyTopFour);

// 实时降雨量等值面图
export const getRealTimeRainfallIsosurfaceMap = () =>
    send({
        tag: 'prediction',
        url: setUrl('/realData/getRealDataJSON'),
        method: 'POST',
    }).then(analysisResponse);

const handleImgUrl = data => {
    const { prediction, realtime } = data;
    return {
        imageList: [
            {
                url: `${process.env.VUE_APP_IMG_HOST}${prediction}`,
                title: '降雨量预测',
            },
            {
                url: `${process.env.VUE_APP_IMG_HOST}${realtime}`,
                title: '实时降雨量',
            },
        ],
        previewSrcList: [
            `${process.env.VUE_APP_IMG_HOST}${prediction}`,
            `${process.env.VUE_APP_IMG_HOST}${realtime}`,
        ],
    };
};
// 降雨量对比图接口
export const getRainfallComparisonChart = params =>
    send({
        tag: 'prediction',
        url: setUrl('/realData/getContrastJSONImg'),
        method: 'POST',
        params,
    })
        .then(analysisResponse)
        .then(handleImgUrl);
