/*
 * @Author: zhangyang
 * @Date: 2022-06-07 10:15:06
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-07 12:50:35
 * @Description: file content
 */
import { unref, ref, shallowRef, computed } from "@vue/composition-api";
import { setupDefault } from "./share";

const defaultTableData = setupDefault({
    total: 0,
    data: []
});

export function useData(response = {}) {
    const result = defaultTableData(response);

    const total = ref(result.total);
    const data = shallowRef(result.data);
    const tableData = computed(() => ({
        total: unref(total),
        data: unref(data)
    }));

    function setupTableData(response) {
        const result = defaultTableData(response);
        total.value = result.total;
        data.value = result.data;
    }

    return {
        tableData,
        setupTableData
    }
}