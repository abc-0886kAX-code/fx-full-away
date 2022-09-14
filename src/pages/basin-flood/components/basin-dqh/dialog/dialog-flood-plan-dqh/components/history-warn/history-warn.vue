<!--
 * @Author: zhangxin
 * @Date: 2022-06-16 16:46:00
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-22 13:30:57
 * @Description: 
-->
<template>
    <div class="ytxd-history-warn">
        <p v-if="isRender" v-html="structure"></p>
        <ytxd-empty v-else></ytxd-empty>
    </div>
</template>

<script>
import { watchEffect, ref, unref, computed } from "@vue/composition-api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
export default {
    name: "ytxd-history-warn",
    mixins: [DialogContentMixins],
    components: {},
    props: {},
    setup(props) {
        const structure = computed(() => {
            return unref(props)?.info?.history_dispatch_plan ?? "";
        });
        const isRender = computed(() => {
            return unref(structure).length > 0;
        });

        return {
            structure,
            isRender,
        };
    },
};
</script>
<style lang='scss' scoped>
.ytxd-history-warn {
    height: 100%;
    width: 98%;
    overflow-x: hidden;
    overflow-y: auto;
    white-space: pre-wrap;
    color: #fff;
    margin: 0 auto;
}
.ytxd-history-warn p {
    line-height: 27px;
    font-size: 14px;
}
</style>