<!--
 * @Author: maggot-code
 * @Date: 2022-05-25 14:11:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-09 18:03:31
 * @Description: file content
-->
<template>
    <div
        class="play-slice-item"
        :class="itemClassName"
        ref="itemRefs"
        @click="handlerActiveIndex"
    >
        <div class="play-slice-item-body play-slice-item-body-draw">
            <p class="play-slice-item-body-text">日期：{{ time }}</p>
        </div>
    </div>
</template>

<script>
import { usePlaySliceState } from "@/biz/PlaySlice/usecase/usePlaySliceState";
import store from "@/stroe";
import {
    computed,
    nextTick,
    ref,
    unref,
    watchEffect,
} from "@vue/composition-api";

export default {
    name: "play-slice-item",
    mixins: [],
    components: {},
    props: {
        item: [String, Object],
        index: [Number, String],
    },
    setup(props) {
        const { playState } = usePlaySliceState();
        const time = computed(() => unref(props.item)?.time ?? "");
        const itemRefs = ref();

        const active = computed(() => store.getters.active);
        const max = computed(() => {
            const value = store.getters.dataLength - 1;
            return value <= 0 ? 0 : value;
        });
        const diffActive = computed(() => unref(max) - unref(active));
        const isActive = computed(
            () => unref(diffActive) === unref(props.index)
        );

        // const style = computed(() => {
        //     const color = unref(isActive) ? '#ff0000' : '#FFFFFF';
        //     const cursor = unref(playState) ? "no-drop" : "pointer";

        //     return {
        //         color,
        //         cursor
        //     }
        // });
        const itemClassName = computed(() => {
            const disabledName = unref(playState)
                ? "play-slice-item-disabled"
                : "";
            const activeName = unref(isActive) ? "play-slice-item-active" : "";
            return [disabledName, activeName];
        });

        const handlerActiveIndex = () => {
            if (unref(playState)) return;

            store.dispatch("_setupActive", unref(max) - unref(props.index));
        };

        watchEffect(async () => {
            if (!unref(isActive)) return;
            await nextTick();
            const { offsetTop, clientHeight } = unref(itemRefs);

            const value = offsetTop + clientHeight;

            store.dispatch("_setupScrollPosition", value);
        });

        return {
            time,
            itemRefs,
            itemClassName,
            handlerActiveIndex,
        };
    },
};
</script>
<style lang='scss' scoped>
$activeColor: #c2f345;
$keepColor: #147c9a;

.play-slice-item {
    width: 100%;
    padding: 6px 8px 6px 0;
    box-sizing: border-box;
    cursor: pointer;

    &-body {
        width: 100%;
        padding: 6px;
        text-align: center;
        box-sizing: border-box;

        background: none;
        border: 0;

        box-shadow: inset 0 0 0 2px $keepColor;
        color: $keepColor;

        position: relative;
        vertical-align: middle;

        &::before,
        &::after {
            box-sizing: inherit;
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
        }

        &-text {
            padding: 0;
            margin: 0;
            height: 32px;
            line-height: 32px;
            font-size: 18px;
            user-select: none;
            color: #ddd;
        }
    }

    &-body-draw {
        transition: color 0.25s;

        &::after,
        &::before {
            border: 2px solid transparent;
            width: 0;
            height: 0;
        }

        &::before {
            top: 0;
            left: 0;
        }

        &::after {
            bottom: 0;
            right: 0;
        }

        &:hover .play-slice-item-body-text {
            color: $activeColor;
        }

        &:hover::before,
        &:hover::after {
            width: 100%;
            height: 100%;
        }

        &:hover::before {
            border-top-color: $activeColor;
            border-right-color: $activeColor;
            transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
        }

        &:hover::after {
            border-bottom-color: $activeColor;
            border-left-color: $activeColor;
            transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s,
                height 0.25s ease-out 0.75s;
        }
    }
}

.play-slice-item-disabled {
    cursor: no-drop;
}

.play-slice-item-active {
    & .play-slice-item-body-text {
        color: $activeColor;
    }
}
</style>