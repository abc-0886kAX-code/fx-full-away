/*
 * @Author: zhangxin
 * @Date: 2022-06-24 18:14:27
 * @LastEditors: 120835827@qq.com 120835827@qq.com
 * @LastEditTime: 2022-07-22 16:07:38
 * @Description:
 */
import { Load } from "@/biz/share/entify/Load";
import { isFunction } from "lodash";

import { useLegend } from "@/pages/rainfall-forecast/components/rainfall-legend";
import { computed, onBeforeUnmount, provide, ref, unref, watch } from "@vue/composition-api";

export function useLayerLegendRender() {
    const {
        loading: LegendLoading,
        loadStyle,
        setupLoading: setupLegendLoading,
    } = Load();
    const { setupLegend, legendProps } = useLegend();
    const visable = ref(false);
    const methods = ref();
    const tagVisable = ref(true);
    const isMethods = computed(() => isFunction(unref(methods)));
    const setupMethods = (request) => {
        methods.value = request ?? null
    };
    const setupVisble = (status) => {
        visable.value = status ?? false;
    };
    const setupTagVisable = (status) => {
        tagVisable.value = status ?? true;
    }

    const gatherProps = computed(() => {
        return {
            info: unref(legendProps),
            ...loadStyle,
            "is-label": false,
            "is-tag": unref(tagVisable)
        };
    });
    const setupOptions = (request) => {
        setupMethods(request);
        setupLegendLoading(true);
    };

    const clearOptions = () => {
        setupLegend({});
        setupMethods(null);
    };

    const handlerReload = async () => {
        await unref(methods)();
    };

    // 根据是否提供了刷新函数，来判断是否需要渲染
    watch(
        () => unref(isMethods),
        setupVisble,
        { immediate: true }
    );

    // 解决在tabs组件内切换或不经过homeIndex中handlerResolve()方法且不需要图例的情况
    const peerVisavle = ref(false);
    const setupPerrVisable = (status) => {
        peerVisavle.value = status ?? false;
    }

    provide("layerLegend", {
        setupTagVisable,
        setupOptions,
        clearOptions,
        setupLegend,
        setupMethods,
        setupLegendLoading,
        handlerReload,
        peerVisavle,
        setupPerrVisable
    });

    // 组件销毁的时候，清理保存的回调函数，不然无法被回收
    onBeforeUnmount(() => {
        clearOptions();
    });

    return {
        LegendVisable: visable,
        LegendLoading,
        gatherProps,
        handlerReload,
        setupLegendLoading,
        clearOptions,
        setupPerrVisable,
    };
}
