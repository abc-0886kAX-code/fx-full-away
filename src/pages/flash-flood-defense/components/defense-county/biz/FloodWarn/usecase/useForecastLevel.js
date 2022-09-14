/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\usecase\useForecastLevel.js
 * @Author: zhangyang
 * @Date: 2022-08-04 15:25:57
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-04 16:12:45
 * @Description: 
 */
import { unref } from "@vue/composition-api";
import { usePolygonGrid } from "@/biz/Mars3D/usecase/usePolygonGrid";

import { getForecastWarnLevelGeoJson } from "../api/level.api";

export function useForecastLevel(mapview, options = {}) {
    const {
        GeoJsonLayer,
        timeSelectBiz,
        setupLegend,
        setupLegendLoading,
        setupOptions,
    } = options;

    const { setupShape } = usePolygonGrid(mapview);

    async function doBusiness() {
        const result = await getForecastWarnLevelGeoJson({ type: unref(timeSelectBiz).value }).catch(setupOptions).finally(setupLegendLoading);
        GeoJsonLayer.clear();
        GeoJsonLayer.find().load(setupShape(result));
        setupLegend(result);
    }

    return {
        doBusiness
    }
}

export default useForecastLevel;
