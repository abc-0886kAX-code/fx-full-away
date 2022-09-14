/*
 * @Author: zhangyang
 * @Date: 2022-04-25 10:46:15
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-26 23:59:08
 * @Description: file content
 */
import {
    watch,
    shallowRef,
    nextTick,
    onMounted,
    onUnmounted
} from "@vue/composition-api";

export function useAttach(mapview, mapbox) {
    const mapviewRef = shallowRef(null);

    mapviewRef.value = mapview;

    watch(
        () => mapviewRef.value,
        (v, old, onInvalidate) => {
            if (v & !v.proof(old._id)) {
                old.uninstall();
                nextTick(() => v.install(mapbox.value));
                onInvalidate(() => v.uninstall());
            }
        }
    );

    onMounted(() => {
        mapview.install(mapbox.value);
    });

    onUnmounted(() => {
        mapview.uninstall();
    });

    return mapviewRef;
}