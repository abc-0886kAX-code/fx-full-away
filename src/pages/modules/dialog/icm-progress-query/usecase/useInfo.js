/*
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-progress-query\usecase\useInfo.js
 * @Author: zhangyang
 * @Date: 2022-07-01 16:07:30
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-01 16:31:29
 * @Description: 
 */
import {
    PROGRESS_ID,
    PROGRESS_NAME,
    PROGRESS_COMMENT,
    PROGRESS_PATH,
    PROGRESS_STATUS,
    PROGRESS_SUB_STATUS,
} from "../share/field";
import { InfoEntity, InfoTemplateEntity } from "../entity/info";
import { computed, reactive } from "@vue/composition-api";

const setupTemplateValue = (info) => (cell, index) => {
    const { prop, label, handler } = cell;
    return {
        index,
        prop,
        label,
        value: handler(info[prop]),
    }
}

export function useInfo() {
    const info = reactive(InfoEntity);
    const template = computed(() => InfoTemplateEntity.map(setupTemplateValue(info)));

    function setupInfo(data) {
        info[PROGRESS_ID] = data[PROGRESS_ID];
        info[PROGRESS_NAME] = data[PROGRESS_NAME];
        info[PROGRESS_COMMENT] = data[PROGRESS_COMMENT];
        info[PROGRESS_PATH] = data[PROGRESS_PATH];
        info[PROGRESS_STATUS] = data[PROGRESS_STATUS];
        info[PROGRESS_SUB_STATUS] = data[PROGRESS_SUB_STATUS];
    }

    return {
        info,
        template,
        setupInfo,
    }
}
