<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 13:55:39
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-15 10:52:16
 * @Description: 流域洪水
-->
<template>
    <screen-grid-container>
        <template v-slot:head>
            <screen-grid-select
                icon="el-icon-s-opportunity"
                :active.sync="active"
                :menu="menu"
                :width="80"
                @toComponent="handlerComponent"
                @toDialog="handlerDialog"
            >
                <template #default="node">
                    <screen-grid-node :node="node"></screen-grid-node>
                </template>
            </screen-grid-select>
        </template>

        <template v-slot:body>
            <component :is="componentName"></component>
        </template>
    </screen-grid-container>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import store from "@/stroe";
import { getBasinFloodMenu } from "./basin-flood-menu.js";

import { useWatchRevert } from "@/biz/ScrrenGrid/usecase/useWatchRevert";
import { ref } from "@vue/composition-api";
import { componentsInstall } from "./components-install";

const Name = "basin-flood";

export default {
    name: Name,
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { ...componentsInstall },
    props: {},
    setup(props, context) {
        const { menu, defaultID } = getBasinFloodMenu();
        const active = ref(defaultID);
        const componentName = ref("");

        const setupDefaultActive = () => (active.value = defaultID);
        useWatchRevert(Name, {
            setupDriver: setupDefaultActive,
        });

        const handlerComponent = (cell) => {
            const { component, revert, id: code, toport } = cell ?? {};

            store.dispatch("_setBasinCache", { code, toport });

            componentName.value = component;
            revert &&
                context.emit("onResolve", {
                    ...cell,
                    type: Name,
                });
        };

        const handlerDialog = (cell) => {
            context.emit("onDialog", cell);
        };

        return {
            menu,
            active,
            componentName,
            handlerComponent,
            handlerDialog,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./basin-flood.scss";
</style>
