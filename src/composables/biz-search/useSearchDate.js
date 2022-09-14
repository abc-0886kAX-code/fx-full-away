/*
 * @Author: zhangyang
 * @Date: 2022-06-06 17:42:44
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-05 13:11:33
 * @Description: file content
 */
import {
    isBeforeEight,
    getYesterdayEightTime,
    getTodayEight,
    getNowTime
} from "./share";
import { isString } from "lodash";
import { useSearchDate } from "./useSearch";
import { unref, ref } from "@vue/composition-api";
import { default as addDays } from 'date-fns/addDays';

// 设置时间选择区间
export function useDateTimeSection(date, future, step) {
    const isFuture = future ?? false;
    const limitRef = ref(date);
    const limitDateLock = ref(false);
    function setupDateRange(time) {
        const limitDate = new Date(unref(limitRef));
        const closeState = time >= Date.now();
        const openState = time >= Date.now()
            || time < limitDate
            || time > addDays(limitDate, step - 1);

        return unref(limitDateLock) ? openState : closeState;
    }
    function setupDateFutureRange(time) {
        const limitDate = new Date(unref(limitRef));
        const openState = time < limitDate || time > addDays(limitDate, step - 1);

        return unref(limitDateLock) ? openState : false;
    }
    function setupStartOrEndPick({ maxDate, minDate }) {
        if (minDate && !unref(limitDateLock)) {
            limitRef.value = minDate;
            limitDateLock.value = true;
        }
        if (maxDate && unref(limitDateLock)) limitDateLock.value = false;
    }
    return {
        setupDateRange: isFuture ? setupDateFutureRange : setupDateRange,
        setupStartOrEndPick
    }
}

// 设置开始时间
export function useStartDate(field, options = {}) {
    const start = isBeforeEight() ? getYesterdayEightTime() : getTodayEight();

    const { schema, setupValue, setupUISchema } = useSearchDate(field, 'datetime', {
        ui: {
            placeholder: "开始日期",
            format: "yyyy-MM-dd HH:mm",
        },
        value: start,
        ...options
    });

    return {
        startSchema: schema,
        setupStartValue: setupValue,
        setupStartUISchema: setupUISchema
    }
}

// 设置结束时间
export function useEndDate(field, options = {}) {
    const end = getNowTime();

    const { schema, setupValue, setupUISchema } = useSearchDate(field, 'datetime', {
        ui: {
            placeholder: "结束日期",
            format: "yyyy-MM-dd HH:mm",
        },
        value: end,
        ...options
    });

    return {
        endSchema: schema,
        setupEndValue: setupValue,
        setupEndUISchema: setupUISchema
    }
}

// 设置自定义时间
export function useCustomDate(field, options = {}) {
    const { title, col, defaultTime } = options;
    const label = isString(title) ? title : "";

    return useSearchDate(field, 'datetime', {
        ui: {
            col: col ?? 12,
            label,
            placeholder: isString(title) ? `请选择${title}` : "请选择时间",
            format: "yyyy-MM-dd HH:mm",
            defaultTime: defaultTime ?? "08:00:00"
        },
        ...options
    });
}

// 开始和结束时间联合使用
export function useStartOrEndDate(fields, options = {}) {
    const { title, column, range, future } = options;
    const [stField, etField] = fields;
    const field = `${stField}-${etField}`;
    const label = isString(title) ? title : "";
    const col = column ?? 12;
    const start = isBeforeEight() ? getYesterdayEightTime() : getTodayEight();
    const end = getNowTime();
    const { setupDateRange, setupStartOrEndPick } = useDateTimeSection(start, future, range ?? 5);
    const { schema, setupValue, setupUISchema } = useSearchDate(field, "datetimerange", {
        ui: {
            label,
            col,
            editable: false,
            clearable: true,
            timeArrowControl: true,
            format: "yyyy-MM-dd HH:mm",
            rangeSeparator: "至",
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间",
            defaultTime: ["08:00:00", getNowTime("HH:mm:ss")],
            pickerOptions: {
                disabledDate: setupDateRange,
                onPick: setupStartOrEndPick
            },
        },
        value: [start, end],
        ...options
    });

    function setupAnalysisValue(params) {
        if (!params[field]) return params;

        const [st, et] = params[field];
        return Object.assign({}, params, {
            [stField]: st,
            [etField]: et
        });
    }

    return {
        startOrEndField: field,
        startOrEndSchema: schema,
        setupAnalysisValue,
        setupStartOrEndValue: setupValue,
        setupStartOrEndUISchema: setupUISchema,
    }
}
