/*
 * @Author: zhangyang
 * @Date: 2021-05-11 16:14:13
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-11 17:37:53
 * @Description: file content
 */
import Vue from 'vue';
import { MGrouter } from 'maggot-utils';
import { default as RouterMap } from './modules';

const { VueRouter } = MGrouter;
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

function querysParse(querys) {
    const paramsList = querys.split('&');
    const params = {};

    paramsList.forEach(item => {
        const [field, value] = item.split('=');
        params[field] = value || ""
    });

    return params;
}

export const constantRoutes = [
    {
        path: '/',
        redirect: '/home',
        name: 'root',
        meta: {
            title: "root",
            power: false
        },
    },
    {
        path: '/test',
        name: 'test',
        meta: {
            title: "测试",
            power: false
        },
        component: () => import('@/pages/test')
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: "登录",
            power: false
        },
        component: () => import('@/pages/login')
    },
    {
        path: "/404",
        name: "404",
        meta: {
            title: "404",
            power: false
        },
        component: () => import('@/pages/not-page')
    },
    ...RouterMap,
    { path: "*", redirect: '/404', hidden: false }
];

const createRouter = () => new VueRouter({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    basetitle: "",
    deftitle: "",
    useTitle: false,
    routes: constantRoutes
})

const router = createRouter();

// 放在路由表最后的404路由
export const notRoutes = { path: "*", redirect: '/404', hidden: false };

// 前端路由映射 对应后台路由的component标识
export const RouterComponents = {
    "main-layout": () => import('@/pages/layout/main-layout'),
    "menu-layout": () => import('@/pages/layout/menu-layout'),
    "nav-layout": () => import('@/pages/layout/nav-layout')
};

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {Array} 
 */
export const generator = (routerMap, parent) => {
    return routerMap.map(item => {
        // MODULE_NOT_FOUND
        const { title, hidden, icon } = item.meta || {};
        const currentRouter = {
            path: item.path,
            name: item.name,
            component: (RouterComponents[item.component]) || (resolve => require([`@/pages${item.component}`], resolve)),
            meta: {
                title: title,
                icon: icon || undefined,
                permission: [],
            }
        }
        // 是否设置了隐藏菜单
        hidden && (currentRouter.meta.hidden = hidden)
        // 设置页面需要权限控制
        currentRouter.meta.power = true
        // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
        if (!currentRouter.path.startsWith('http')) {
            currentRouter.path = currentRouter.path.replace('//', '/')
        }

        item.redirect && (currentRouter.redirect = item.redirect)
        // 参数
        if (item.query) {
            currentRouter.meta.query = querysParse(item.query);
        }

        if (parent) {
            currentRouter.meta.parentName = parent.name;
        }

        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            // 防止重定向的地址没有
            let path = item.children[0].path[0] === '/'
                ? (item.children[0].path)
                : (`${item.path}/${item.children[0].path}`);
            currentRouter.redirect = path;
            // 防止重定向的地址没有

            currentRouter.children = generator(item.children, currentRouter)
        }
        return currentRouter
    })
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router;