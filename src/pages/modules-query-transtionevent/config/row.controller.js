/*
 * @FilePath: \3D防汛作战\src\pages\modules-query-transtionevent\config\row.controller.js
 * @Author: zhangyang
 * @Date: 2022-06-30 14:04:48
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-06 14:55:38
 * @Description: 
 */
import { setupModulesDialog } from "@/api/icm/business";

const handlerRowLevelData = ({ row }) => {
    return setupModulesDialog("icm-transtion-data-query", row)
}
export default {
    data: {
        mode: "data",
        type: "default",
        icon: "el-icon-coin",
        label: "数据查询",
        handler: handlerRowLevelData
    }
};
