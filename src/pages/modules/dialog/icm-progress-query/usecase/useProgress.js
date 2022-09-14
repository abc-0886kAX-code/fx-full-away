/*
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-progress-query\usecase\useProgress.js
 * @Author: zhangyang
 * @Date: 2022-07-01 15:46:28
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-01 16:33:55
 * @Description: 
 */
import { computed } from "@vue/composition-api";
import { useInfo } from "./useInfo";
import { usePath } from "./usePath";
import { useStatus } from "./useStatus";
import { useSubStatus } from "./useSubStatus";

export function useProgress() {
    const {
        info,
        template,
        setupInfo,
    } = useInfo();
    const progressPath = computed(() => usePath(info));
    const progressStatus = computed(() => useStatus(info));
    const progressSubStatus = computed(() => useSubStatus(info));

    return {
        progressInfo: info,
        progressTemplate: template,
        progressPath,
        progressStatus,
        progressSubStatus,
        setupInfo,
    }
}
