<!--
 * @FilePath: \3D防汛作战\src\pages\modules\modules.vue
 * @Author: zhangyang
 * @Date: 2022-06-28 15:05:36
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-30 16:09:21
 * @Description: 
-->
<template>
    <div class="modules-layout">
        <ytxd-menu class="modules-layout-menu" :menuMap="menuTree"></ytxd-menu>

        <main class="modules-layout-body">
            <div class="modules-layout-body-size">
                <transition name="el-fade-in-linear">
                    <router-view />
                </transition>
            </div>
        </main>

        <ytxd-dialog :visable.sync="dialogVisable" :loading="dialogLoading" :title="dialogTitle" :width="dialogWidth"
            :height="dialogHeight">
            <component :key="dialogKey" :is="dialogName" :info="dialogProps" @loadStart="dialogLoadStart"
                @loadEnd="dialogLoadEnd" @closeDialog="dialogClose"></component>
        </ytxd-dialog>
    </div>
</template>

<script>
import { useDialog } from "@/composables/useDialog";
import { ModulesExpectParents } from "@/router/modules/modules";

import { dialogInstall } from "./dialog/install";
import YtxdMenu from "@/components/menu";

const filterModuleRoutes = (route) => {
    const { parent, meta } = route;
    return parent && ModulesExpectParents.includes(parent.name) && meta?.isMenu;
}

const cacheRoute = new Map();
const flatMapToTree = (upper) => (response, node) => {
    const { name: upperName } = upper;
    const { name: nodeName, parent: nodeParent } = node;
    const { name: parentName } = nodeParent;

    if (parentName !== upperName) {
        const children = cacheRoute.has(parentName) ? cacheRoute.get(parentName) : [];
        cacheRoute.set(parentName, [...children, node])
    } else {
        response.push(Object.assign({}, node, { children: cacheRoute.get(nodeName) }));
        cacheRoute.delete(nodeName);
    }

    return response;
}

export default {
    name: 'modules',
    mixins: [],
    components: {
        ...dialogInstall,
        YtxdMenu
    },
    props: {},
    setup() {
        const dialog = useDialog();

        return {
            ...dialog
        }
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        menuTree() {
            const routes = this.$router.getRoutes().filter(filterModuleRoutes).reduce(flatMapToTree({ name: "modules" }), []);

            return routes;
        }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./modules.scss";
</style>
