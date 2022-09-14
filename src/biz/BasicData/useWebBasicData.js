/*
 * @FilePath: \3D防汛作战\src\biz\BasicData\useWebBasicData.js
 * @Author: zhangyang
 * @Date: 2022-06-17 13:34:28
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-17 13:49:50
 * @Description: 基础数据 web 服务使用方法
 */
import store from "@/stroe";
import {
    onMounted,
    onBeforeUnmount
} from "@vue/composition-api";

export default function useWebBasicData(options = {}) {
    const {
        tag,
        layer,
        clear,
        executeQuery
    } = options;

    const setupMounted = async() => {
        store.dispatch("_cancelTagRequest", tag ?? "");
        clear();
        const { points } = await executeQuery();
        layer.addGraphic(points);
        layer.flyTo();
    }

    onMounted(async () => {
        await setupMounted();
    });

    onBeforeUnmount(() => {
        clear();
    });

    return {}
}
