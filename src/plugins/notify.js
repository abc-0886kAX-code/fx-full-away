/*
 * @Author: maggot-code
 * @Date: 2021-05-11 16:02:55
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-04 10:31:02
 * @Description: file content
 */
import { curry } from 'lodash';
const setTitle = (title) => {
    return title;
}
const setType = (type) => {
    return type;
}
const setMsg = (msg) => {
    return msg;
}
const setOptions = (title, type, msg) => {
    return {
        title: setTitle(title),
        type: setType(type),
        message: setMsg(msg),
        duration: 5000,
        position: 'top-right',
        offset: 70
    }
}

export const SetNotify = curry(setOptions);
export const SetNotifySuccess = curry(setOptions)('成功!', 'success');
export const SetNotifyWarning = curry(setOptions)('警告!', 'warning');
export const SetNotifyError = curry(setOptions)('异常!', 'error');