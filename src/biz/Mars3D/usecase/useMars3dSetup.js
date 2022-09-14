/*
 * @Author: zhangyang
 * @Date: 2022-04-25 09:18:31
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-28 14:58:35
 * @Description: file content
 */
import {
    provide,
    unref,
    watch,
    ref,
    onMounted,
    onUnmounted
} from "@vue/composition-api";
import { EventType } from "mars3d";

import { Load } from "@/biz/share/entify/Load";
import { Mapview } from "../entity/Mapview";
import { Mars3dSymbolName } from "../share/context";
import { useAttach } from "./useAttach";

export function useMars3dSetup(props, ctx) {
    const { loading, loadStyle, setupLoading } = Load();

    const isMounted = ref(false);

    const mapbox = ref(null);

    const mapview = new Mapview(props.config);

    const mapviewRef = useAttach(mapview, mapbox);

    provide(Mars3dSymbolName, mapviewRef);

    onMounted(() => {
        mapview.onReady(() => {
            ctx.emit("onReady", mapview.view);
            setupLoading(false);
            isMounted.value = true;
        })
    });

    onUnmounted(() => {
        isMounted.value = false;
    });

    return {
        isMounted,
        loading,
        loadStyle,
        mapbox,
        mapview,
        setupLoading
    }
}