/*
 * @FilePath: \3D防汛作战\src\pages\modules-query-transtionevent\config\table.column.js
 * @Author: zhangyang
 * @Date: 2022-06-30 10:41:11
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-08 13:14:37
 * @Description: 
 */
export const tableRequest = { order: "desc", prop: "id" };

export default [
    {
        isSort: true,
        prop: "id",
        mold: "default",
        label: "主键",
        align: "center",
        width: 120,
    },
    {
        prop: "name",
        mold: "default",
        label: "模型名称",
        align: "left",
    },
    {
        prop: "modified_by",
        mold: "default",
        label: "修改者",
        align: "center",
        width: 120
    },
    {
        prop: "comment",
        mold: "default",
        label: "备注",
        align: "left",
    }
]
