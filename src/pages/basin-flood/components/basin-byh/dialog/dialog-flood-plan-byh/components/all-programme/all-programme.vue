<!--
 * @Author: zhangxin
 * @Date: 2022-06-16 16:46:00
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-22 13:31:04
 * @Description: 
-->
<template>
    <div class="ytxd-all-programme">
        <p v-if="isRender" v-html="structure"></p>
        <ytxd-empty v-else></ytxd-empty>
    </div>
</template>

<script>
import { watchEffect, ref, unref, computed } from "@vue/composition-api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
export default {
    name: "ytxd-all-programme",
    mixins: [DialogContentMixins],
    components: {},
    props: {},
    setup(props) {
        const structure = computed(() => {
            return unref(props)?.info?.dispatch_plan ?? "";
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
.ytxd-all-programme {
    height: 100%;
    width: 98%;
    overflow-x: hidden;
    overflow-y: auto;
    white-space: pre-wrap;
    color: #fff;
    margin: 0 auto;
}
.ytxd-all-programme p {
    line-height: 27px;
    font-size: 14px;
}
</style>