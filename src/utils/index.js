/*
 * @Author: zhangyang
 * @Date: 2021-05-11 17:13:12
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-08-13 13:25:46
 * @Description: file content
 */
import { isNil, isString, isArray, isNumber, reduce, add, flattenDeep, isBoolean } from 'lodash';

export const isUrl = (path) => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:/?#[\]@!\\$&'\\(\\)\\*\\+,;=.]+$/.test(path);

export const isColor = (color) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);

export const routerAs = (regexp) => (path) => regexp.test(path);

export const stringAs = (str) => !isNil(str) && isString(str);

export const numberAs = (num) => !isNil(num) && isNumber(num);

export const arrayAs = (arr) => !isNil(arr) && isArray(arr) && arr.length > 0;

export const defaultString = (str, def = '') => stringAs(str) ? str : def;

export const defaultNumber = (num, def = 0) => numberAs(num) ? num : def;

export const defaultArray = (arr, def = []) => arrayAs(arr) ? arr : def;

export const toPX = (num) => `${num}px`;

export const toPercent = (num) => `${num}%`;

export const toVw = (num) => `${num}vw`;

export const mergeNumber = (numbers, offset) => add(reduce(numbers, add), defaultNumber(offset));

export const deepRange = (list, nodeKey) => flattenDeep(list.map(item => arrayAs(item[nodeKey]) ? deepRange(item[nodeKey]) : item));

export const imgUrlToBase64 = (url) => new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');

    const image = new Image();

    image.src = url;

    image.onerror = (error) => {
        reject(error)
    }

    image.onload = ({ target }) => {
        const { width, height } = target;

        canvas.width = width;
        canvas.height = height;

        canvas.getContext('2d').drawImage(target, 0, 0, width, height);

        resolve(canvas.toDataURL('image/png'));
    }
})

export const formatTime = (fmt) => (baseDate) => {
    const date = new Date(baseDate);
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
}

export const useWaring = (waring) => isNumber(waring) ? waring > 0 : isBoolean(waring) ? waring : false;