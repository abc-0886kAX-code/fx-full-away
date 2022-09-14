<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 13:55:39
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 13:33:01
 * @Description: 山洪防御
-->
<template>
    <screen-grid-container>
        <template v-slot:head>
            <screen-grid-select icon="el-icon-s-flag" :active.sync="active" :menu="menu" :width="80"
                @toComponent="handlerComponent" @toDialog="handlerDialog">
                <template #default="node">
                    <screen-grid-node :node="node"></screen-grid-node>
                </template>
            </screen-grid-select>
        </template>

        <template v-slot:body>
            <component :key="sign" :is="componentName" v-bind="menuNode"></component>
        </template>
    </screen-grid-container>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import FlashFloodDefenseMenu from "./flash-flood-defense-menu.json";

import { ref } from "@vue/composition-api";
import { Sign } from "@/biz/share/entify/Sign";
import { useWatchRevert } from "@/biz/ScrrenGrid/usecase/useWatchRevert";
import { componentsInstall } from "./components-install";

const Name = "flash-flood-defense";

export default {
    name: Name,
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { ...componentsInstall },
    props: {},
    setup(props, context) {
        const { menu, defaultID } = FlashFloodDefenseMenu;
        const { sign, setupSign } = Sign();
        const active = ref(defaultID);
        const componentName = ref("");
        const menuNode = ref({});

        const setupDefaultActive = () => (active.value = defaultID);
        useWatchRevert(Name, {
            setupDriver: setupDefaultActive,
        });

        const handlerComponent = (cell) => {
            const { component, revert } = cell;
            menuNode.value = cell;
            componentName.value = component;
            setupSign();
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
            sign,
            menu,
            menuNode,
            active,
            componentName,
            handlerComponent,
            handlerDialog,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./flash-flood-defense.scss";
</style>
