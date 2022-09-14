/*
 * @FilePath: \3D防汛作战\src\api\icm\business.js
 * @Author: zhangyang
 * @Date: 2022-07-01 09:44:15
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-12 14:21:19
 * @Description: 
 */
import { isNil } from "lodash";

// 模型业务查询弹框数据组合
export const setupModulesDialog = (component, options) => {
    const { name: title, w, h } = options;
    return {
        name: component,
        title,
        props: options,
        size: { w, h }
    }
}
// 模型业务模板弹框数据组合
export const setupModulesTmpDialog = (component, options) => {
    const { tmpname: title, w, h } = options;
    return {
        name: component,
        title,
        props: options,
        size: { w, h }
    }
}
// 调整ICM模型数据集结构
export const setupIcmSiteMapping = (cell, sites) => {
    const mapping = {};
    sites.forEach((name, index) => {
        mapping[name] = cell[index + 1];
    });
    return mapping;
}
export const mergeIcmDataSource = ({ data, sites }) => {
    const datacase = isNil(data) ? [] : data;
    const sitescase = isNil(sites) ? [] : sites;
    return datacase.map((cell, index) => {
        return {
            ...setupIcmSiteMapping(cell, sitescase),
            time: cell?.P_DATETIME,
            index
        }
    });
}
export const transformIcmColumn = ({ sites }) => {
    const sitescase = isNil(sites) ? [] : sites;
    return sitescase.map((prop) => {
        return {
            prop,
            mold: "default",
            label: prop,
            align: "center",
            minWidth: 120
        }
    });
}
export const transformIcmDataSource = (source) => {
    const sourcecase = isNil(source) ? {
        date: null,
        timeStep: null,
        sites: null,
        data: null
    } : source;
    const columns = transformIcmColumn(sourcecase);
    columns.push({
        prop: "time",
        mold: "default",
        label: "日期",
        align: "center",
        width: 220
    });
    return Object.assign({}, sourcecase, {
        datacase: mergeIcmDataSource(sourcecase),
        columns
    });
}


// ICM事件查询兜底
export const icmEventQueryPocket = (data) => data ?? [];

// ICM事件查询排序
export const icmEventQuerySort = (params) => (data) => {
    const { order, prop } = params;
    return order === "asc" ? data.sort((prev, next) => prev[prop] - next[prop]) : data.sort((prev, next) => next[prop] - prev[prop]);
}
