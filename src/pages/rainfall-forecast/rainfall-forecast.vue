<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 13:55:39
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-16 12:20:11
 * @Description: 降雨预报
-->
<template>
    <screen-grid-container>
        <template v-slot:head>
            <screen-grid-select
                icon="el-icon-warning"
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
import RainfallForecastMenu from "./rainfall-forecast-menu.json";

import { ref } from "@vue/composition-api";
import { useWatchRevert } from "@/biz/ScrrenGrid/usecase/useWatchRevert";
import { componentsInstall } from "./components-install";

const Name = "rainfall-forecast";

export default {
    name: Name,
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {
        ...componentsInstall,
    },
    props: {},
    emit: ["onDialog", "onResolve"],
    setup(props, context) {
        const { menu, defaultID, resetID } = RainfallForecastMenu;
        const active = ref(defaultID);
        const componentName = ref("");

        const setupDefaultActive = () => (active.value = resetID);
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
            const { dialog } = cell;
            const attr = Object.assign({}, cell, {
                dialogName: dialog,
            });
            context.emit("onDialog", {
                graphic: {
                    attr,
                    name: "时段降雨量",
                },
            });
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
@import "./rainfall-forecast.scss";
</style>
