/*
 * @FilePath: \3D防汛作战\src\pages\modules-import-template\config\row.controller.js
 * @Author: zhangyang
 * @Date: 2022-07-06 16:22:14
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-11 14:22:41
 * @Description: 
 */
import { setupModulesTmpDialog } from "@/api/icm/business";

const handlerAdd = () => {
    return setupModulesTmpDialog("icm-tmp-add", { tmpname: "新增模板", w: "40%", h: "40vh" })
}
const handlerSite = ({ row }) => {
    return setupModulesTmpDialog("icm-tmp-site", { ...row, w: "80%", h: "75vh" })
}
const handlerEdit = ({ row }) => {
    return setupModulesTmpDialog("icm-tmp-edit", { ...row, w: "40%", h: "40vh" })
}
const handlerDelete = ({ row }) => {
    return setupModulesTmpDialog("icm-tmp-delete", { ...row, w: "30%", h: "30vh" })
}

export const usableEvent = ["site", "edit", "delete"];

export const usableEventAll = ["add"];

export default {
    add: {
        mode: "add",
        type: "success",
        icon: "el-icon-receiving",
        label: "新增",
        handler: handlerAdd
    },
    site: {
        mode: "site",
        type: "primary",
        icon: "el-icon-receiving",
        label: "站点",
        handler: handlerSite
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
