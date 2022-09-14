/*
 * @Author: zhangyang
 * @Date: 2020-11-10 09:57:15
 * @LastEditors: zhangyang
 * @LastEditTime: 2020-12-24 17:54:14
 * @Description: file content
 */

import { isNumber, isString, isFunction } from "lodash";

// type 与 组件名称 对照表
export const typeToComponentName = {
    input: "ytxd-form-input",
    select: "ytxd-form-select",
    date: "ytxd-form-date",
    choice: "ytxd-form-choice",
};

// 设置input类型默认值
export const setInput = (item) => {
    return setDefaultDate(item.params.value, '');
}
// 设置select类型默认值
export const setSelect = (item) => {
    const {
        list,
        valueField
    } = item.params;
    return list.length <= 0 ? "" : list[0][valueField];
}
// 设置date类型默认值
export const setDate = (item) => {
    let { format, year, month, day, hour, minute, second } = item.params;

    if (item.fieldValue) {
        return new Date(item.fieldValue).Format(format)
    }

    year = setDefaultDate(year, 0);
    month = setDefaultDate(month, 0);
    day = setDefaultDate(isFunction(day) ? day() : day, 0);
    hour = setDefaultDate(hour, 8);
    minute = setDefaultDate(minute);
    second = setDefaultDate(second);

    const baseDate = new Date();
    baseDate.setTime(baseDate.getTime() + 24 * day * 60 * 60 * 1000);

    baseDate.setFullYear(new Date().getFullYear() + year);
    baseDate.setMonth(new Date().getMonth() + month);
    baseDate.setHours(hour);
    baseDate.setMinutes(minute);
    baseDate.setSeconds(second);
    return baseDate.Format(format);
}

// 设置时间默认值
const setDefaultDate = (val, def = 0) => {
    return isString(val) || isNumber(val) ? val : def;
}
// 设置choice类型默认值
export const setChoice = (item) => {
    const { list } = item.params;
    return list.length <= 0 ? "" : list[0].value;
}

// 对应表单框类型设置默认值
export const setFormDefault = {
    input: setInput,
    select: setSelect,
    date: setDate,
    choice: setChoice
}