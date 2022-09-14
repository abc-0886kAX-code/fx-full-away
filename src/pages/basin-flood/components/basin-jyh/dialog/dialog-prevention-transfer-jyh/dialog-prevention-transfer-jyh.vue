<!--
 * @Author: zhangyang
 * @Date: 2021-07-01 14:54:16
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-21 15:33:57
 * @Description: file content
-->
<template>
    <div class="dialog-prevention-transfer-jyh">
        <ytxd-tabs :active.sync="tabActive" :tabs="tabsMap"></ytxd-tabs>
        <main class="rainfall-main">
            <component
                :is="tabActive"
                :info="params"
                @loadStart="passonLoadStart"
                @loadEnd="passonLoadEnd"
            ></component>
        </main>
    </div>
</template>

<script>
import { bizComponents } from "./components/component.mount";
import { useTabs } from "@/composables/useTabs";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";

const tabDefault = "ytxd-biz-scheme";
const tabsMap = [
    {
        id: "ytxd-biz-scheme",
        label: "避险转移路线",
    },
    {
        id: "ytxd-biz-all-scheme",
        label: "山洪转移安置点",
    },
];
export default {
    name: "dialog-prevention-transfer-jyh",
    mixins: [DialogContentMixins],
    components: { ...bizComponents },
    props: {},
    setup(props, context) {
        const passonLoadStart = () => context.emit("loadStart");
        const passonLoadEnd = () => context.emit("loadEnd");

        return {
            params: props.info,
            ...useTabs(tabsMap, tabDefault),
            passonLoadStart,
            passonLoadEnd,
        };
    },
};
</script>
<style lang='scss' scoped>
.dialog-prevention-transfer-jyh {
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