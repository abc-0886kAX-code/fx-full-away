/*
 * @FilePath: \3D防汛作战\src\pages\modules-run-start\useImitateStatus.js
 * @Author: zhangyang
 * @Date: 2022-07-06 13:00:56
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-06 15:18:15
 * @Description: 
 */
import { unref, computed, shallowRef, ref } from "@vue/composition-api";
import { isNil } from "lodash";

export const ImitateStatus = {
    success: {
        type: "success",
        tips: "模拟发起成功"
    },
    failure: {
        type: "danger",
        tips: "模拟发起失败"
    },
    unknow: {
        type: "info",
        tips: "模拟状态未知"
    },
    silence: {
        type: "",
        tips: "未启动模拟"
    }
};

// 拆分模拟路径
export const splitImitatePath = (path = "") => {
    const pathString = path ?? "";
    return pathString.split(">").splice(1);
}

// 设置模拟状态
export const setupImitateStatus = (status) => {
    if (isNil(status)) return "silence";

    if (!Object.keys(ImitateStatus).includes(status)) return "unknow";

    return status;
}

export function useImitateStatus(searchForm) {
    const nameRef = ref("暂无名称");
    const pathRef = shallowRef([]);
    const messageRef = ref("暂无描述");
    const statusRef = ref("silence");
    const statusResult = computed(() => {
        const { type, tips } = ImitateStatus[unref(statusRef)];
        return {
            name: unref(nameRef),
            path: unref(pathRef),
            message: unref(messageRef),
            statusTips: tips,
            statusType: type
        }
    });
    function setupStatusResult(result = {}) {
        const { data } = unref(searchForm).formOutput();
        nameRef.value = data.runName;
        pathRef.value = splitImitatePath(result?.path);
        messageRef.value = result?.message ?? "暂无描述";
        statusRef.value = setupImitateStatus(result?.status);
    }

    return {
        statusResult,
        setupStatusResult
    }
}
