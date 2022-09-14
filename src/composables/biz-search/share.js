/*
 * @Author: zhangyang
 * @Date: 2022-04-19 16:37:33
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-08 23:33:15
 * @Description: file content
 */
import { default as addDays } from 'date-fns/addDays';
import { default as addHours } from "date-fns/addHours";
import { default as getHours } from 'date-fns/getHours';
import { default as format } from "date-fns/format";

// 获取当前小时数是否小于8
export function isBeforeEight() {
    return getHours(Date.now()) < 8;
}

// 获取当前时间点
export function getNowTime(formatType = "yyyy-MM-dd HH:mm:ss") {
    return format(Date.now(), formatType);
}

// 获取之前的小时
export function getBeforeHours(hours, formatType = "HH:00") {
    return format(addHours(Date.now(), -hours), formatType);
}

// 获取当天8点
export function getTodayEight() {
    return format(Date.now(), "yyyy-MM-dd 08:00:00");
}

// 获取昨天8点
export function getYesterdayEightTime() {
    return format(addDays(Date.now(), -1), "yyyy-MM-dd 08:00:00");
}

// 获取当年
export function getYear() {
    return format(Date.now(), "yyyy");
}

// 获取当月
export function getMonth() {
    return format(Date.now(), "MM");
}

export const setupHours = (time, formatType = "yyyy-MM-dd HH:mm") => {
    const st = new Date(time);
    const et = addHours(st, 1);
    return [
        format(st, formatType),
        format(et, formatType)
    ]
}

export const formatTimeStamp = (time) => {
    const [startTime, endTime] = setupHours(time);
    const [_, endTimeLabel] = endTime.split(" ");

    return {
        part: [startTime, endTime].join(","),
        label: `${startTime} ~ ${endTimeLabel}`,
    }
}

// 根据开始时间和结束时间生成时间段列表（每小时）
export function setupTimeSlot(st, et) {
    const start = new Date(st);
    let end = new Date(et);
    const timeSlot = [];

    while (end >= start && timeSlot.length < 72) {
        timeSlot.push(format(end, 'yyyy-MM-dd HH:mm'));
        end = addHours(end, -1);
    }

    return timeSlot;
}

export const setupTimeSelect = (st, et) => {
    const list = setupTimeSlot(st, et).map(formatTimeStamp);
    const value = list[0].part;

    return {
        list,
        value
    }
}