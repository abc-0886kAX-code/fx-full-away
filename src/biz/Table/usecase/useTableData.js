/*
 * @Author: zhangyang
 * @Date: 2022-04-21 09:21:30
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-28 10:57:24
 * @Description: file content
 */
import { Table } from "@/biz/Table/entity/Table";
import { provide, unref } from "@vue/composition-api";

export function useTableData(name = "default") {
    const { table, setupSign, setupLoading, setupColumn, setupData, setupController, setupUiSchema, setupChoice, resetChoice, getChoiceData } = Table();

    const setupTableData = (asyncData) => {
        setupLoading(true);

        return asyncData
            .then((res) => {
                setupData(res);
                setupLoading(false);
                return res;
            })
            .catch((error) => {
                console.log(error);
                setupData([]);
                return [];
            })
            .finally(() => {
                setupSign();
            });
    }

    provide(name, unref(table));

    return {
        table,
        setupSign,
        setupLoading,
        setupTableData,
        setupTableColumn: setupColumn,
        setupRowController: setupController,
        setupUiSchema,
        setupChoice,
        getChoiceData,
        resetChoice
    }
}