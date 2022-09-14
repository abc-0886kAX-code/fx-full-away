/*
 * @Author: zhangyang
 * @Date: 2022-04-11 16:50:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-04 14:01:47
 * @Description: 首页
 */
import {
    ModulesImport,
    ModulesQuery, ModulesRedirect, ModulesRun
} from "./modules";

export default {
    path: '/home',
    name: 'home',
    redirect: "/home/index",
    meta: {
        title: "首页",
        power: true,
        isMenu: true
    },
    component: () => import('@/pages/home'),
    children: [
        {
            path: "/home/index",
            name: "homeIndex",
            meta: {
                title: "首页",
                power: true,
                isMenu: true
            },
            component: () => import("@/pages/homeIndex")
        },
        {
            path: "/home/modules",
            name: "modules",
            redirect: ModulesRedirect,
            meta: {
                title: "模块管理",
                power: true,
                isMenu: true
            },
            component: () => import("@/pages/modules"),
            children: [
                ModulesImport,
                ModulesQuery,
                ModulesRun,
            ]
        }
    ]
};
