<!--
 * @Author: maggot-code
 * @Date: 2022-05-25 13:30:01
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-09 10:49:51
 * @Description: file content
-->
<template>
    <div
        class="play-slice-list"
        ref="listRefs"
        v-loading="loading"
        v-bind="loadStyle"
    >
        <template v-for="(item, index) in datalist">
            <play-slice-item
                :key="index"
                :item="item"
                :index="index"
            ></play-slice-item>
        </template>
    </div>
</template>

<script>
import store from "@/stroe";
import { watch, unref, computed, ref } from "@vue/composition-api";

import { loadStyle } from "@/biz/share/entify/Load";

import PlaySliceItem from "./play-slice-item.vue";

export default {
    name: "play-slice-list",
    mixins: [],
    components: {
        PlaySliceItem,
    },
    props: {},
    setup() {
        const listRefs = ref();
        const parentHeight = computed(
            () => unref(listRefs).parentNode.clientHeight ?? 0
        );

        const datalist = computed(() => [...store.getters.datamap].reverse());

        const scrollPosition = computed(() => store.getters.scrollPos);
        const loading = computed(() => store.getters.playLoading);

        watch(
            () => unref(scrollPosition),
            (position) => {
                const { clientHeight } = unref(listRefs);
                const value = position - unref(parentHeight);
                const pos = value < 0 ? 0 : value;
                unref(listRefs).scrollTop = pos;
            }
        );

        return {
            listRefs,
            datalist,
            loading,
            loadStyle,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./play-slice-list.scss";
</style>