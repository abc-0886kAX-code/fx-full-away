<!--
 * @Author: zhangxin
 * @Date: 2022-06-16 16:46:00
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-24 09:25:56
 * @Description: 
-->
<template>
    <div class="dialog-flood-plan-ydh">
        <ytxd-tabs :active.sync="tabActive" :tabs="tabsMap"></ytxd-tabs>
        <main class="pool-main">
            <component
                :is="tabActive"
                :info="gatherProps"
                @loadStart="loadStart"
                @loadEnd="loadEnd"
            ></component>
        </main>
    </div>
</template>

<script>
import { computed, onMounted, ref, unref } from "@vue/composition-api";
import { bizComponents } from "./components/component.mount";
import { getReservoirSiteFrontDetails } from "../../api";
import { useTabs } from "@/composables/useTabs";
import { Load } from "@/biz/share/entify/Load";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";

const tabDefault = "ytxd-all-programme";
const tabs = [
    {
        id: "ytxd-all-programme",
        label: "全部洪水调度方案",
    },
    {
        id: "ytxd-history-warn",
        label: "历史调度信息",
    },
    {
        id: "ytxd-main-indicators",
        label: "主要技术指标",
    },
    {
        id: "ytxd-schedule",
        label: "附表",
    },
    {
        id: "ytxd-attached-drawings",
        label: "附图",
    },
    {
        id: "ytxd-organization-structure",
        label: "组织结构",
    },
    {
        id: "ytxd-risk-decision",
        label: "风险决策",
    },
];

export default {
    name: "dialog-flood-plan-ydh",
    mixins: [DialogContentMixins],
    components: { ...bizComponents },
    props: {},
    setup(props, context) {
        const { loading, loadStyle, setupLoading } = Load();
        const { tabActive, tabsMap } = useTabs(tabs, tabDefault);

        const requestData = ref({});

        const gatherProps = computed(() => {
            return Object.assign({}, unref(requestData), props.info);
        });

        const executeQuery = async () => {
            loadStart();
            requestData.value = await getReservoirSiteFrontDetails({
                stcd: props.info.stcd,
            });

            loadEnd();
        };

        const loadStart = () => {
            context.emit("loadStart");
        };

        const loadEnd = () => {
            context.emit("loadEnd");
        };
        onMounted(async () => {
            await executeQuery();
        });

        return {
            tabsMap,
            tabActive,
            loadStart,
            loadEnd,
            loading,
            gatherProps,
        };
    },
};
</script>
<style lang='scss' scoped>
.dialog-flood-plan-ydh {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;
    & .pool-main {
        width: 100%;
        height: calc(100% - 60px);
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>