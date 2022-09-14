/*
 * @FilePath: \3D防汛作战\src\biz\BasicData\useArcGISBasicData.js
 * @Author: zhangyang
 * @Date: 2022-06-17 13:34:15
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-17 14:59:08
 * @Description: 
 */
import {
    onMounted,
    onBeforeUnmount
} from "@vue/composition-api";

export default function useArcGISBasicData(options = {}) {
    const {
        layer
    } = options;
    
    onMounted(() => { });

    onBeforeUnmount(() => {});

    return {}
}
