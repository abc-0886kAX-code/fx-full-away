/*
 * @Author: maggot-code
 * @Date: 2022-05-25 14:48:06
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-06 16:19:56
 * @Description: file content
 */
import store from "@/stroe";

export function usePlaySliceData(indexState = false) {
    const setupData = async (awaitData) => {
        const data = await awaitData();
        store.dispatch("_setupDataSource", { data, indexState });
        store.dispatch("_setupPlayLoad", false);
        return data;
    }

    const clearData = () => {
        store.dispatch("_setupDataSource", { data: [], indexState });
    }

    return {
        setupData,
        clearData
    }
}
