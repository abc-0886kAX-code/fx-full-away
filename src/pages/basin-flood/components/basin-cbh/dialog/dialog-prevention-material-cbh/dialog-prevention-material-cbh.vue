<!--
 * @Author: zhangxin
 * @Date: 2022-06-20 10:56:33
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-20 13:11:41
 * @Description: 
-->
<template>
    <div class="dialog-prevention-material-cbh">
        <ytxd-tabs :active.sync="tabActive" :tabs="tabsMap"></ytxd-tabs>
        <main class="rainfall-main">
            <component
                :is="tabActive"
                :info="siteInfo"
                @loadStart="loadStart"
                @loadEnd="loadEnd"
            ></component>
        </main>
    </div>
</template>

<script>
import { bizComponents } from "./components/component.mount";
import { useTabs } from "@/composables/useTabs";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { computed } from "@vue/composition-api";

const tabDefault = "ytxd-biz-details";

const tabs = [
    {
        id: "ytxd-biz-details",
        label: "站点信息",
    },
    {
        id: "ytxd-biz-table",
        label: "数据表格",
    },
];
export default {
    name: "dialog-prevention-material-cbh",
    mixins: [DialogContentMixins],
    components: { ...bizComponents },
    props: {},
    setup(props, context) {
        const siteInfo = computed(() => props.info);

        const { tabActive, tabsMap } = useTabs(tabs, tabDefault);

        const loadStart = () => {
            context.emit("loadStart");
        };

        const loadEnd = () => {
            context.emit("loadEnd");
        };

        return {
            siteInfo,
            tabsMap,
            tabActive,
            loadStart,
            loadEnd,
        };
    },
};
</script>
<style lang='scss' scoped>
.dialog-prevention-material-cbh {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;
    & .rainfall-main {
        width: 100%;
        height: calc(100% - 60px);
    }
}
</style>