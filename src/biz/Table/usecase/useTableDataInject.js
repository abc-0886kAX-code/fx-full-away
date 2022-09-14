/*
 * @Author: zhangyang
 * @Date: 2022-04-21 09:47:16
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-27 16:45:47
 * @Description: file content
 */
import { Table } from "@/biz/Table/entity/Table";
import { inject, unref } from "@vue/composition-api";

export function useTableDataInject(name = "default") {
    const { table, setupSign } = Table();

    const provideSource = inject(name, unref(table));

    return {
        provideSource,
        tableSign: provideSource.sign,
        tableLoading: provideSource.loading,
        tableColumn: provideSource.column,
        tableData: provideSource.data,
        rowController: provideSource.controller,
        uiSchema: provideSource.uiSchema,
        tableChoice: provideSource.tableChoice,
        setupSign
    }
}