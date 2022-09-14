<!--
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\defense-county.vue
 * @Author: zhangyang
 * @Date: 2022-08-03 10:44:25
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-03 16:12:23
 * @Description: 
-->
<template>
    <div class='defense-county'>
        <el-tabs class="defense-county-tabs" v-model="tabKey" @tab-click="handleClick">
            <el-tab-pane v-for="(item, key) in tabEnum" :key="key" :name="key">
                <span slot="label">
                    <i class="ticon"></i>
                    {{ item.label }}
                </span>
            </el-tab-pane>
        </el-tabs>
        <component :is="tabBiz.name"></component>
    </div>
</template>

<script>
import { TabComponent } from "./shared/tab";
import { useTab } from "./usecase/useTab";

export default {
    name: 'defense-county',
    mixins: [],
    components: {
        ...TabComponent
    },
    props: {
        id: String
    },
    setup(props) {
        const tabEntity = useTab(props.id, "flood-warn");

        function handleClick(tab) {
            tabEntity.tabSetupKey(tab.name);
        }

        return {
            ...tabEntity,
            handleClick
        };
    }
};
</script>
<style lang='scss' scoped>
@import "./defense-county.scss";
@import "~@/assets/style/home-table.scss";
</style>
