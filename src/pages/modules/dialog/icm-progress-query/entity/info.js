/*
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-progress-query\entity\info.js
 * @Author: zhangyang
 * @Date: 2022-07-01 16:08:07
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-01 16:35:26
 * @Description: 
 */
import {
    PROGRESS_ID,
    PROGRESS_ID_LABEL,
    PROGRESS_NAME,
    PROGRESS_NAME_LABEL,
    PROGRESS_COMMENT,
    PROGRESS_COMMENT_LABEL,
    PROGRESS_PATH,
    PROGRESS_STATUS,
    PROGRESS_SUB_STATUS,
} from "../share/field";
import { IMITATE_UNKNOWN } from "../share/context";
import { flake } from "maggot-utils";

export function setupProgressKey(id) {
    return id ?? flake.gen();
}

export function setupProgressDescribe(describe) {
    return describe ?? "暂无信息";
}

export function setupProgressStatusKey(status) {
    return status ?? IMITATE_UNKNOWN;
}

export const InfoEntity = {
    [PROGRESS_ID]: setupProgressKey(),
    [PROGRESS_NAME]: setupProgressDescribe(),
    [PROGRESS_COMMENT]: setupProgressDescribe(),
    [PROGRESS_PATH]: setupProgressDescribe(),
    [PROGRESS_STATUS]: setupProgressStatusKey(),
    [PROGRESS_SUB_STATUS]: setupProgressStatusKey(),
};

export const InfoTemplateEntity = [
    {
        prop: PROGRESS_ID,
        label: PROGRESS_ID_LABEL,
        handler: setupProgressKey,
    },
    {
        prop: PROGRESS_NAME,
        label: PROGRESS_NAME_LABEL,
        handler: setupProgressDescribe,
    },
    {
        prop: PROGRESS_COMMENT,
        label: PROGRESS_COMMENT_LABEL,
        handler: setupProgressDescribe,
    }
];
