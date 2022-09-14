/*
 * @Author: maggot-code
 * @Date: 2022-05-26 15:47:30
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-07 10:54:14
 * @Description: file content
 */
import { computed, ref, unref } from "@vue/composition-api";
import addDays from "date-fns/addDays";
import addHours from "date-fns/addHours";
import format from "date-fns/format";
import { isNil } from "lodash";

const dateFormat = "yyyy-MM-dd HH:mm:ss";

const defaultTime = ["09:00:00", "12:00:00"];

function setupDefaultTimeGroup() {
    const endtime = Date.now();
    const starttime = addHours(endtime, -2);
    return [starttime, endtime];
}

export function useDatePick(options) {
    const { type } = options;
    const typetrue = type ?? "datetimerange";

    const [st, et] = setupDefaultTimeGroup();
    const starttime = ref(st);
    const endtime = ref(et);

    const timeGroup = computed({
        get() {
            return [
                format(unref(starttime), dateFormat),
                format(unref(endtime), dateFormat)
            ];
        },
        set(newValue) {
            const [start, end] = isNil(newValue) ? setupDefaultTimeGroup() : newValue;

            starttime.value = start;
            endtime.value = end;
        }
    });

    const timeAlone = computed({
        get() {
            return format(unref(endtime), dateFormat);
        },
        set(newValue) {
            const [_, end] = setupDefaultTimeGroup();
            const value = isNil(newValue) ? end : newValue;
            endtime.value = value;
        }
    });

    const dateType = {
        datetimerange: {
            value: timeGroup,
            defaultTime: defaultTime,
            limit: setupDatetimerange
        },
        datetime: {
            value: timeAlone,
            defaultTime: defaultTime[0],
            limit: setupDatetime
        }
    }

    const datePickProps = {
        type: typetrue,
        editable: false,
        clearable: true,
        size: "mini",
        placeholder: "选择时间",
        "range-separator": "至",
        "start-placeholder": "开始时间",
        "end-placeholder": "结束时间",
        "time-arrow-control": true,
        "default-time": dateType[typetrue].defaultTime,
        "picker-options": {
            disabledDate: dateType[typetrue].limit
        }
    }

    function setupDatetimerange(time) {
        return time > unref(endtime) || time < addDays(unref(endtime), -3);
    }

    function setupDatetime(time) {
        return false;
        // return time > Date.now() || time < addDays(unref(endtime), -3);
    }

    return {
        timeValue: dateType[typetrue].value,
        datePickProps
    }
}