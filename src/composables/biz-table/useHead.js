/*
 * @Author: zhangyang
 * @Date: 2022-06-08 09:48:08
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-08 10:54:09
 * @Description: file content
 */
import { unref, shallowRef } from "@vue/composition-api";

export function useHead() {
    const tableSchema = shallowRef([]);

    function setupTableSchema(options) {
        tableSchema.value = options;
    }

    return {
        tableSchema,
        setupTableSchema
    }
}