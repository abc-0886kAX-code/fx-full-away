/*
 * @Author: zhangyang
 * @Date: 2021-05-11 17:13:20
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-28 10:09:48
 * @Description: file content
 */
import { defaultNumber, toPX, mergeNumber } from '@/utils';
import { isString } from 'lodash';

const trim = function (string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

// 事件绑定
export const on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

// 事件解绑
export const off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();

// 是否存在class name
export function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

// 增加类名
export function addClass(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}

// 移除类名
export function removeClass(el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

// 获取元素属性
export const getStyle = () => { }

// 设置元素样式属性
export const setStyle = () => { }

// 元素宽度
export const setWidth = (width) => isString(width) ? width : `${width}px`;

// 元素高度
export const setHeight = (height) => isString(height) ? height : `${height}px`

// 获取元素宽度
export const getElementWidth = (element) => {
    const { clientWidth } = element;
    return clientWidth;
}

// 获取元素高度
export const getElementHeight = (element) => {
    const { clientHeight } = element;
    return clientHeight;
}
// 设置元素高度
export const setElementHeight = (element, height) => {
    element.style.height = toPX(defaultNumber(height));
    return element;
}
// 合并元素高度
export const mergeElementHeight = element => offset => mergeNumber(element.map(getElementHeight), offset);