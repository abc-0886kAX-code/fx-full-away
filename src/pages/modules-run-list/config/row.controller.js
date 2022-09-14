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
    return setupModulesDialog("icm-run-list", row)
}
const handlerProgress = ({ row }) => {
    return setupModulesDialog("icm-run-list-progress", row)
}
const handlerRegion = ({ row }) => {
    return setupModulesDialog("icm-run-list-region", row)
}
export default {
    plan: {
        mode: "plan",
        type: "default",
        icon: "el-icon-coin",
        label: "模拟详情查询",
        handler: handlerPlan
    },
    progress: {
        mode: "progress",
        type: "primary",
        icon: "el-icon-connection",
        label: "模拟进度查询",
        handler: handlerProgress
    },
    region: {
        mode: "region",
        type: "success",
        icon: "el-icon-coin",
        label: "区域统计查询",
        handler: handlerRegion
    }
};
