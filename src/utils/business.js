/*
 * @Author: zhangyang
 * @Date: 2022-04-14 10:17:34
 * @Description: file content
 */

import { concat, find, flattenDeep, flow, isString, union } from "lodash";

// 过滤趋势数值状态
// -1 下降 1 上升 0 平稳
const style = `font-weight: bold;font-size: 16px;`;
const down = `<i style="${style}color:#F56C6C;" class="el-icon-bottom"></i>`;
const up = `<i style="${style}color:#67C23A;" class="el-icon-top"></i>`;
const stable = `<i style="${style}color:#409EFF;" > - </i>`;
const normal = `<i style="${style}color:#000;" > - </i>`;
const downPure = {
    text: "下降",
    style: {
        color: "#F56C6C"
    }
};
const upPure = {
    text: "上升",
    style: {
        color: "#67C23A"
    }
};
const stablePure = {
    text: "平稳",
    style: {
        color: "#409EFF"
    }
};
export const filterTrendStatus = (trend, pure = false) => {
    const isStable = (trend === 0 || !trend);
    if (pure) {
        return isStable ? stablePure : (trend < 0 ? downPure : upPure);
    }

    if (isStable) { return normal }
    return trend < 0 ? down : up;
}

// 获取评价罗马字
export const getAssess = (baseAsses) => {
    if (!baseAsses) {
        return '——'
    }
    const rome = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ'];
    return rome[baseAsses - 1];
}

export const analysisResponse = (response) => {
    const { data } = response;
    return data;
}

// 接口数据扩展
export const setupDataSourceExtends = (handlers) => (data) => {
    return data.map((item, index, sources) => {
        const extendsItem = {};

        handlers.forEach((handler) => {
            Object.assign(extendsItem, handler(item, index, sources));
        });

        return Object.assign({}, item, extendsItem);
    });
}
// 从大到小排序
export const setupSortByDesc = (field) => (data) => {
    return data.sort((prev, next) => {
        const prevValue = prev[field] ?? 0;
        const nextValue = next[field] ?? 0;
        return prevValue - nextValue;
    });
};
/**
 * @description: 处理折线图所需数据结构
 * @param {Array} list 基础数据数组
 * @return {Array} 合并时间，过滤数据，保留数值后的echarts图表数据数组
 * @step1 通过mergeData方法抹平数据(多维数组还原到一维数组)
 * @step2 通过map来取出mergeData一维数组中的时间部分保留
 * @step3 通过loadsh.union方法来对取出的时间数组去重
 * @step4 通过filterData过滤数据保证返回值与时间对应，形成新的对象保留(不存在的为0值)
 */
export function handlerLineData(list) {
    return union(
        mergeData(list).map((item) => item.itemdate)
    ).map((t) => filterData(t, list));
}
// 过滤数据
function filterData(time, list) {
    const obj = {
        itemdate: time,
    };
    list.forEach((item) => {
        obj[item.name] = filterValue(time, item.data);
    });
    return obj;
}
// 过滤数值
function filterValue(time, data) {
    const target = find(data, (item) => item.itemdate === time);
    return target ? target.itemvalue : 0;
}
// 合并数据
function mergeData(list) {
    const fnc = flow(concat, flattenDeep);
    return fnc(list.map((item) => item.data));
}


// 获取开始年 - 结束年
export const getStartAndEndYear = (start, end) => {
    const date = new Date();
    const startYear = date.getFullYear() - start;
    const endYear = date.getFullYear() - end;
    return {
        startYear: startYear,
        endYear: endYear
    }
}

// 获取固定年份
const getFixedYears = (year = 0) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - year);
    return date.Format('yyyy-MM-dd');
}

// 设置对比接口开始和结束时间
export const setStartAndEndTime = (start, end) => ({
    startTime: getFixedYears(start),
    endTime: getFixedYears(end)
});

// json 解析函数
export const parseJson = (value) => {
    const isEmptyString = isString(value) && value.trim().length <= 0;
    return isEmptyString ? "{}" : value;
}

export const formatPage = (query) => {
    const { order, current, size, prop } = query;
    return {
        order,
        page: current,
        rows: size,
        sort: prop
    }
}

export const setupErrorTable = () => ({ total: 0, data: [] });

export function base64ToBlob(imgData) {
    const arr = imgData.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bytes = window.atob(arr[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new File([ia], "mars3dScreenshot.png", { type: mime });
}
