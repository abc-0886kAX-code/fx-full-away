/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\usecase\useForecastArea.js
 * @Author: zhangyang
 * @Date: 2022-08-08 09:52:02
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 11:41:06
 * @Description: 
 */
import { unref } from "@vue/composition-api";
import { useOutputImage } from "./useOutputImage";
import { usePolygonGrid } from "@/biz/Mars3D/usecase/usePolygonGrid";
import { Message } from "element-ui";
import { downloadFile } from "@/biz/common-template/utils";

import { getForecastWarnAreaGeoJson, getDangerVillageData, getForecastDataExport } from "../api/area.api";
import { uploadFile } from "@/api/common.api";

export function useForecastArea(mapview, options = {}) {
    const {
        GeoJsonLayer,
        timeSelectBiz,
        setupLegend,
        setupLegendLoading,
        setupOptions,
        setupPonitRender,
    } = options;

    const { setupOutputImage } = useOutputImage(mapview, {
        layer: GeoJsonLayer.find(),
        legendId: "rainfall-legend"
    });
    const { setupShape } = usePolygonGrid(mapview);

    async function doBusiness() {
        const params = { type: unref(timeSelectBiz).value };
        const result = await getForecastWarnAreaGeoJson(params).catch(setupOptions).finally(setupLegendLoading);
        GeoJsonLayer.clear();
        GeoJsonLayer.find().load(setupShape(result));
        setupLegend(result);
        const points = await getDangerVillageData(params);
        if (points.length <= 0) Message({
            type: "warning",
            message: `未来${unref(timeSelectBiz).label}无山洪风险`
        });
        setupPonitRender(points);
    }

    async function doExport() {
        const { files } = await setupOutputImage();
        const { data } = await uploadFile({ files });
        const [imagePath] = data;
        const { filepath } = await getForecastDataExport({
            dangertype: unref(timeSelectBiz).value,
            imagePath,
        });
        downloadFile(`${process.env.VUE_APP_IMG_HOST}${filepath}`);
    }

    return {
        doBusiness,
        doExport
    }
}

export default useForecastArea;
