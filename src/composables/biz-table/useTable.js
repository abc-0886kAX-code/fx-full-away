/*
 * @Author: zhangyang
 * @Date: 2022-06-07 10:16:47
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-08 10:55:25
 * @Description: file content
 */
import { unref, computed } from "@vue/composition-api";

import { Sign } from "@/biz/share/entify/Sign";
import { useData } from "./useData";
import { useHead } from "./useHead";
import { useFactor } from "./useFactor";
import { useChoice } from "./useChoice";

export function useTable(options = {}) {
    const { sign, setupSign } = Sign();
    const { tableData, setupTableData } = useData();
    const { tableSchema, setupTableSchema } = useHead();
    const { factor, setupQuery, setupBody } = useFactor(options);
    const { choice, setChoice } = useChoice();

    const tableRequest = computed(() => {
        const { query } = unref(factor);
        return query;
    });

    return {
        tableData,
        tableSchema,
        tableRequest,
        tableKey: sign,
        tableChoice: choice,
        tableFactor: factor,
        setupTableData,
        setupTableSchema,
        setupTableKey: setupSign,
        setupTableChoice: setChoice,
        setupTableFactorQuery: setupQuery,
        setupTableFactorBody: setupBody
    }
}