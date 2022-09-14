<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 13:55:39
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-29 14:43:27
 * @Description: 城市内涝
-->
<template>
    <screen-grid-container>
        <template v-slot:head>
            <screen-grid-select
                icon="el-icon-s-home"
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
import CityWaterloggingMenu from "./city-waterlogging-menu.json";
import { ref } from "@vue/composition-api";
import { useWatchRevert } from "@/biz/ScrrenGrid/usecase/useWatchRevert";
import { componentsInstall } from "./components-install";
const Name = "city-waterlogging";
export default {
    name: Name,
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { ...componentsInstall },
    props: {},
    setup(props, context) {
        const { menu, defaultID } = CityWaterloggingMenu;
        const active = ref(defaultID);
        const componentName = ref("");

        const setupDefaultActive = () => (active.value = defaultID);
        useWatchRevert(Name, {
            setupDriver: setupDefaultActive,
        });

        const handlerComponent = (cell) => {
            const { component, revert } = cell;

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
@import "./city-waterlogging.scss";
</style>