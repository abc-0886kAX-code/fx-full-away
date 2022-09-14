/*
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-tmp-site\config\row.controller.js
 * @Author: zhangyang
 * @Date: 2022-07-06 16:22:14
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-12 14:20:28
 * @Description: 
 */
import { setupModulesTmpDialog } from "@/api/icm/business";

const handlerAdd = () => {
    return setupModulesTmpDialog("icm-tmp-site-add", { tmpname: "新增站点", w: "25%", h: "30vh" })
}
const handlerEdit = ({ row }) => {
    return setupModulesTmpDialog("icm-tmp-site-edit", { ...row, w: "25%", h: "30vh" })
}
const handlerDelete = ({ row }) => {
    return setupModulesTmpDialog("icm-tmp-site-delete", { ...row, w: "30%", h: "30vh" })
}

export const usableEvent = ["edit", "delete"];

export const usableEventAll = ["add"];

export default {
    add: {
        mode: "add",
        type: "success",
        icon: "el-icon-receiving",
        label: "新增",
        handler: handlerAdd
    },
    edit: {
        mode: "edit",
        type: "warning",
        icon: "el-icon-receiving",
        label: "修改",
        handler: handlerEdit
    },
    delete: {
        mode: "delete",
        type: "danger",
        icon: "el-icon-receiving",
        label: "删除",
        handler: handlerDelete
    }
};
