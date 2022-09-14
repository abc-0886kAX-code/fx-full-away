/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\usecase\useMap.js
 * @Author: zhangyang
 * @Date: 2022-08-03 16:41:35
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 10:54:27
 * @Description: 
 */
import { provide, inject, unref } from "@vue/composition-api";

import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";

export function useMapInject() {
    return inject("FloodWarnMap");
}

export function useMap() {
    const { mapview } = useMars3d();
    const { gather } = useLayer(mapview);
    const HomePointLayer = unref(gather).HomePointLayer;
    const PointLayer = unref(gather).FloodWarnPointLayer;
    const GeoJsonLayer = unref(gather).FloodWarnGeoJsonLayer;

    const output = {
        mapview,
        HomePointLayer,
        PointLayer,
        GeoJsonLayer,
    };

    provide("FloodWarnMap", output);
    return output;
}

export default useMap;
