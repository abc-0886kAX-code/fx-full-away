/*
 * @Author: zhangyang
 * @Date: 2022-06-10 00:03:33
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-10 01:12:02
 * @Description: file content
 */
import { ceil } from "lodash";

function setupMinToMaxSotr(data) {
    let fixedStep = 0;

    const array = [...data].sort((prev, next) => {
        const [_, decimal] = prev.toString().split(".");

        if (decimal && decimal.length > fixedStep) fixedStep = decimal.length;

        return prev - next;
    });

    return {
        fixed: fixedStep,
        data: array,
        len: array.length,
        empty: array.length <= 0,
        min: array[0] ?? 0,
        max: array.at(-1) ?? 0,
    }
}
function setupSingular() {
    return {
        minDiff: 0,
        maxDiff: 0
    }
}
function setupComplex(min, max) {
    const value = Math.abs(min - max);
    return {
        minDiff: value,
        maxDiff: value
    }
}
function setupDiff(data, min, max) {
    return {
        minDiff: Math.abs(min - data[1]),
        maxDiff: Math.abs(max - data.at(-2))
    }
}
export function useMaxAndMinDiff(datasource = []) {
    const { fixed, data, len, empty, min, max } = setupMinToMaxSotr(datasource);

    const setupResult = ({ minDiff, maxDiff }) => {
        return {
            fixed,
            min,
            max,
            minDiff: ceil(minDiff, fixed),
            maxDiff: ceil(maxDiff, fixed),
        }
    }

    if (empty) return setupResult(setupSingular());

    if (len === 1) return setupResult(setupSingular());

    if (len === 2) return setupResult(setupComplex(min, max));

    return setupResult(setupDiff(data, min, max));
}