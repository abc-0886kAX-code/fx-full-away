/*
 * @Author: maggot-code
 * @Date: 2022-05-25 15:20:56
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-17 00:17:19
 * @Description: file content
 */
import store from "@/stroe";
import { isNil, isFunction } from "lodash";
import { watchEffect, unref, computed } from "@vue/composition-api";

// let idxTimer;
// let step = 0;
// const toPlayRadarEcho = (layers) => {
//     const { length } = layers;
//     if (step > length - 1) {
//         step = 0
//         layers.at(-1).opacity = 0
//     }
//     const nowLayer = layers[step];
//     const nextLayer = layers[step + 1];
//     if (!nowLayer || !nextLayer) return;
//     nowLayer.opacity = 1;
//     nextLayer.opacity = 0;
//     clearInterval(idxTimer);
//     idxTimer = window.setInterval(function () {
//         nowLayer.opacity -= 0.01
//         nextLayer.opacity += 0.01

//         if (nowLayer.opacity < 0.01) {
//             nowLayer.opacity = 0
//             step++
//             toPlayRadarEcho(layers);
//         }
//     }, 1 * 1000 * 0.01)
// }


export function usePlaySliceControl(options) {
    let removeWatchEffect;

    const { findLayer, type } = options;

    const active = computed(() => {
        const index = store.getters.active;
        return findLayer(store.getters.findIndex(index))
    });
    const oldActive = computed(() => {
        const index = store.getters.oldActive;
        return findLayer(store.getters.findIndex(index))
    });
    const prev = computed(() => {
        const index = store.getters.prevActive;
        return findLayer(store.getters.findIndex(index))
    });
    const next = computed(() => {
        const index = store.getters.nextActive;
        return findLayer(store.getters.findIndex(index))
    });
    const usable = computed(() => {
        return isNil(unref(prev)) || isNil(unref(next)) || isNil(unref(active))
    });

    const clearPlayMonitor = () => {
        isFunction(removeWatchEffect) && removeWatchEffect();
    }

    const usePlayMonitor = () => {
        clearPlayMonitor();
        removeWatchEffect = watchEffect(() => {
            if (unref(usable)) return;

            if (type === "images") {
                if (store.getters.activeNotEqual) unref(oldActive).opacity = 0.0;
                unref(prev).opacity = 0.0;
                unref(active).opacity = 1.0;
                unref(next).opacity = 0.0;
                return;
            }

            if (type === "geojson") {
                if (store.getters.activeNotEqual) unref(oldActive).setOptions({ show: false });
                unref(prev).setOptions({ show: false });
                unref(active).setOptions({ show: true });
                unref(next).setOptions({ show: false });
                return;
            }
        });
    }

    return {
        clearPlayMonitor,
        usePlayMonitor,
    }
}
