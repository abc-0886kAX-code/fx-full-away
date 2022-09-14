/*
 * @FilePath: \3D防汛作战\src\biz\User\usecase\useUserMask.js
 * @Author: zhangyang
 * @Date: 2022-06-22 15:24:50
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-04 13:19:08
 * @Description: 
 */
import { isString } from "lodash";
import { unref, computed } from "@vue/composition-api";
import { getUserIdentity } from "../entity/Identity";
import {
    setupMaskUrl,
    setupMaskOpacity
} from "../entity/Mask";

import { Cesium, layer } from "mars3d";

const { ArcType } = Cesium;
const { GeoJsonLayer } = layer;

function setupMars3DMask() {
    return {
        id: "user-mask",
        url: setupMaskUrl(getUserIdentity()),
        mask: true,
        zIndex: 10001,
        symbol: {
            styleOptions: {
                opacity: setupMaskOpacity(),
                fill: true,
                color: "rgba(2,26,79,1.0)",
                outline: true,
                outlineColor: "#39E09B",
                outlineWidth: 2,
                outlineOpacity: 0.8,
                arcType: ArcType.GEODESIC,
                clampToGround: true
            }
        }
    }
}

export default function useUserMask() {
    const maskLayer = new GeoJsonLayer(setupMars3DMask());

    const requiredUserMask = computed(() => {
        const { area } = getUserIdentity();
        if (!isString(area)) return false;

        return area.length > 0;
    });

    const setupMaskToMapview = (mapview) => {
        unref(requiredUserMask) && unref(mapview).addLayer(maskLayer);
    }

    return {
        maskLayer,
        requiredUserMask,
        setupMaskToMapview
    }
}
