/*
 * @FilePath: \3D防汛作战\src\biz\Table\usecase\useTableHandleRow.js
 * @Author: zhangyang
 * @Date: 2022-06-30 15:11:30
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-11 14:42:19
 * @Description: 
 */
import { inject, onMounted, onBeforeUnmount, unref } from "@vue/composition-api";

export function useTableHandleRow(funcGather = {}, other = {}) {
    const { provideName, choice } = other;
    const { dialogHandler } = inject(provideName ?? "dialog");
    const handlerGather = new Map();

    function handlerRowAccess(cell) {
        const { mode } = cell;
        if (!handlerGather.has(mode)) return;

        const options = handlerGather.get(mode)(cell);
        dialogHandler(options);
    }

    function handlerAllAccess(cell) {
        const { mode } = cell;
        if (!handlerGather.has(mode)) return;

        const options = handlerGather.get(mode)(cell);
        options.props = Object.assign({}, options.props, {
            choice: unref(choice)
        });

        dialogHandler(options);
    }

    onMounted(() => {
        Object.keys(funcGather).forEach(key => {
            const { mode, handler } = funcGather[key];
            handlerGather.set(mode, handler);
        });
    });

    onBeforeUnmount(() => {
        handlerGather.clear();
    });

    return {
        handlerRowAccess,
        handlerAllAccess
    }
}
