/*
 * @FilePath: \3D防汛作战\src\router\modules\modules.js
 * @Author: zhangyang
 * @Date: 2022-06-28 16:48:07
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-08 17:49:38
 * @Description: 
 */
const setupRouteName = (parent) => (name = "") => parent + name;

export const ModulesRedirect = "/home/modules/import";
// 数据导入
export const modulesImportName = "modulesImport";
export const setupModulesImportRouteName = setupRouteName(modulesImportName);
export const ModulesImport = {
    path: "/home/modules/import",
    redirect: "/home/modules/import/rainevent",
    name: setupModulesImportRouteName(),
    meta: {
        title: "数据导入",
        power: true,
        isMenu: true,
        isFollow: false
    },
    component: () => import( /* webpackChunkName: "transitionRouteView" */ "@/layout/transition-route-view"),
    children: [
        {
            path: "/home/modules/import/rainevent",
            name: setupModulesImportRouteName("RainEvent"),
            meta: {
                title: "降雨事件数据导入",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesImport" */ "@/pages/modules-import-rainevent"),
        },
        {
            path: "/home/modules/import/waterlevel",
            name: setupModulesImportRouteName("WaterLevel"),
            meta: {
                title: "水位数据导入",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesImport" */ "@/pages/modules-import-waterlevel"),
        },
        {
            path: "/home/modules/import/inflow",
            name: setupModulesImportRouteName("Inflow"),
            meta: {
                title: "入流数据导入",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesImport" */ "@/pages/modules-import-inflow"),
        },
        {
            path: "/home/modules/import/transtion",
            name: setupModulesImportRouteName("Transtion"),
            meta: {
                title: "调节器数据导入",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesImport" */ "@/pages/modules-import-transtion"),
        },
        {
            path: "/home/modules/import/tmp",
            name: setupModulesImportRouteName("Template"),
            meta: {
                title: "模板维护",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesImport" */ "@/pages/modules-import-template"),
        },
    ]
};

// 数据查询
export const modulesQueryName = "modulesQuery";
export const setupModulesQueryRouteName = setupRouteName(modulesQueryName);
export const ModulesQuery = {
    path: "/home/modules/query",
    redirect: "/home/modules/query/network",
    name: setupModulesQueryRouteName(),
    meta: {
        title: "数据查询",
        power: true,
        isMenu: true,
        isFollow: false
    },
    component: () => import( /* webpackChunkName: "transitionRouteView" */ "@/layout/transition-route-view"),
    children: [
        {
            path: "/home/modules/query/network",
            name: setupModulesQueryRouteName("Network"),
            meta: {
                title: "模型网络查询",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesQuery" */ "@/pages/modules-query-network"),
        },
        {
            path: "/home/modules/query/rainevent",
            name: setupModulesQueryRouteName("RainEvent"),
            meta: {
                title: "降雨事件查询",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesQuery" */ "@/pages/modules-query-rainevent"),
        },
        {
            path: "/home/modules/query/waterevent",
            name: setupModulesQueryRouteName("WaterEvent"),
            meta: {
                title: "水位事件查询",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesQuery" */ "@/pages/modules-query-waterevent"),
        },
        {
            path: "/home/modules/query/inflow",
            name: setupModulesQueryRouteName("Inflow"),
            meta: {
                title: "入流事件查询",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesQuery" */ "@/pages/modules-query-inflow"),
        },
        {
            path: "/home/modules/query/transtionevent",
            name: setupModulesQueryRouteName("TranstionEvent"),
            meta: {
                title: "调节器事件查询",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesQuery" */ "@/pages/modules-query-transtionevent"),
        },
        {
            path: "/home/modules/query/tmp",
            name: setupModulesQueryRouteName("Template"),
            meta: {
                title: "运行模板查询",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesQuery" */ "@/pages/modules-query-template"),
        },
        {
            path: "/home/modules/query/linktrack",
            name: setupModulesQueryRouteName("LinkTracking"),
            meta: {
                title: "网络上下游追踪",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesQuery" */ "@/pages/modules-query-linktrack"),
        }
    ]
};

// 数据运行
export const modulesRunName = "modulesRun";
export const setupModulesRunRouteName = setupRouteName(modulesRunName);
export const ModulesRun = {
    path: "/home/modules/run",
    redirect: "/home/modules/run/start",
    name: modulesRunName,
    meta: {
        title: "数据运行",
        power: true,
        isMenu: true,
        isFollow: false
    },
    component: () => import( /* webpackChunkName: "transitionRouteView" */ "@/layout/transition-route-view"),
    children: [
        {
            path: "/home/modules/run/start",
            name: setupModulesRunRouteName("Start"),
            meta: {
                title: "发起模拟",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesRun" */ "@/pages/modules-run-start"),
        },
        {
            path: "/home/modules/run/list",
            name: setupModulesRunRouteName("List"),
            meta: {
                title: "模拟列表查询",
                power: true,
                isMenu: true,
                isFollow: false
            },
            component: () => import( /* webpackChunkName: "modulesRun" */ "@/pages/modules-run-list"),
        },
    ]
};


// 模型模块白名单
export const ModulesExpectParents = [
    "modules",
    modulesImportName,
    modulesQueryName,
    modulesRunName
];
