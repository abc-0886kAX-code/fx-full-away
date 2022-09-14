/*
 * @Author: zhangxin
 * @Date: 2022-07-05 14:12:37
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-22 13:21:21
 * @Description: 
 */
import { computed, ref, unref } from '@vue/composition-api';

import { flake } from "maggot-utils";

// 模拟时长(转换为秒) / (结果显示步长 * 计算时间步长) 
// Duration/（ResultsMultiplier*TimeStep）
export function useImgLayerRender() {
    const simId = ref();
    const DurationUnit = ref('Minutes')
    const duration = ref(0);
    const step = ref(0);
    const resultsMultiplier = ref(0);

    const setupSimId = (id) => simId.value = id;
    const setupDuration = (value) => duration.value = value ?? 120;
    const setupStep = (value) => step.value = value ?? 60;
    const setupResultsMultiplier = (value) => resultsMultiplier.value = value ?? 5;
    const setupDurationUnit = (value) => DurationUnit.value = value ?? 'Minutes';


    // 计算步长 
    const timeStep = computed(() => {
        if (unref(setupDurationUnit) === 'Hours') {
            return Math.floor((unref(duration) * 60 * 60) / (unref(step) * unref(resultsMultiplier)) + 1);
        } else {
            return Math.floor((unref(duration) * 60) / (unref(step) * unref(resultsMultiplier)) + 1);
        }
    })

    // 创建数据源
    // nodes:节点 zones:区块 links:线段 
    const createIcmModelData = () => {
        const integration = [];
        console.log(unref(timeStep));
        for (let index = 0; index < unref(timeStep); index++) {
            integration.push({
                id: flake.gen(),
                params: `${unref(simId)}_${index}_zones`,
            })
        }
        return integration;
    }

    const executeQuery = () => {
        return new Promise((resolve, reject) => {
            resolve(createIcmModelData());
        })
    }




    return {
        setupSimId,
        setupDuration,
        setupResultsMultiplier,
        setupDurationUnit,
        setupStep,
        executeQuery
    }
}