/*
 * @FilePath: \3D防汛作战\src\pages\modules-query-network\config\row.controller.js
 * @Author: zhangyang
 * @Date: 2022-06-30 14:04:48
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-01 09:44:49
 * @Description: 
 */
import { setupModulesDialog } from "@/api/icm/business";

const handlerPlan = ({ row }) => {
    return setupModulesDialog("icm-plan-query", row)
}
export default {
    plan: {
        mode: "plan",
        type: "default",
        icon: "el-icon-receiving",
        label: "方案查询",
        handler: handlerPlan
    }
};
