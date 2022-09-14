/*
 * @Author: zhangyang
 * @Date: 2021-06-11 09:17:59
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-15 13:33:10
 * @Description: file content
 */
import { isNil } from 'lodash';

export const setHandler = (power, queue) => {
    if (isNil(power)) {
        return queue;
    }

    const group = {};

    power.forEach((item) => {
        if (queue[item]) {
            group[item] = queue[item];
        }
    });

    return group;
}

/**
 * @description: 设置search参数集合
 * @param {Object} data 原始参数集合
 * @return {Object} 根据业务拼接的参数集合
 */
export const setSearchParams = (data) => {
    const searchData = {};

    for (const field in data) {
        if (data[field]) {
            searchData[field] = data[field];
        }
    }

    if (Object.keys(searchData).length <= 0) {
        searchData.searchnoquery = "no";
    }

    return searchData;
}

export const packingSearchParams = (data) => {
    const searchData = {};

    data.forEach(item => {
        const { field, value } = item;

        searchData[field] = value;
    });

    return setSearchParams(searchData);
}

export const downloadFile = (path) => {
    let download = document.createElement('a');
    download.setAttribute('download', '');
    download.setAttribute('href', path);
    download.click();
    download = null;
}

// 拆分详细查看组件名称或跳转路由和参数
export const splitRouterLink = (routerLink) => {
    const [name, paramsGroup] = routerLink.split('?');
    const paramsList = paramsGroup.split('&');
    const params = {};

    paramsList.forEach(item => {
        const [field, value] = item.split('=');
        params[field] = value || ""
    });

    return { name, params };
}