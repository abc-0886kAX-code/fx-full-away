/*
 * @FilePath: \防汛大屏\src\components\ytxd-table\usecase\useTableProps.js
 * @Author: zhangxin
 * @Date: 2022-08-11 16:00:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-15 11:19:18
 * @Description:
 */
export const useTableProps = expand => {
    return Object.assign({}, expand, {
        tableSchema: {
            type: Object,
            default: () => {
                return {
                    uiSchema: {
                        size: 'medium',
                        stripe: true,
                        isIndex: true,
                        indexWidth: 50,
                    },
                    columnSchema: [],
                };
            },
        },
        tableData: {
            type: Array,
            default: () => [],
        },
    });
};
