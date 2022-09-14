/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\usecase\useActualArea.js
 * @Author: zhangyang
 * @Date: 2022-08-08 10:41:43
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 13:20:33
 * @Description: 
 */
import { unref } from "@vue/composition-api";
import { useOutputImage } from "./useOutputImage";
import { usePolygonGrid } from "@/biz/Mars3D/usecase/usePolygonGrid";
import { Message } from "element-ui";
import { downloadFile } from "@/biz/common-template/utils";

import { getActualWarnAreaGeoJson, getActualWarnAreaTableData, getActualVillageDataExport } from "../api/area.api";
import { uploadFile } from "@/api/common.api";

export function useActualArea(mapview, options = {}) {
    const {
        GeoJsonLayer,
        timeSelectBiz,
        setupLegend,
        setupLegendLoading,
        setupOptions,
        setupPonitRender
    } = options;

    const { setupOutputImage } = useOutputImage(mapview, {
        layer: GeoJsonLayer.find(),
        legendId: "rainfall-legend"
    });
    const { setupShape } = usePolygonGrid(mapview);

    async function doBusiness() {
        const params = { type: unref(timeSelectBiz).value };
        const result = await getActualWarnAreaGeoJson(params).catch(setupOptions).finally(setupLegendLoading);
        GeoJsonLayer.clear();
        GeoJsonLayer.find().load(setupShape(result));
        setupLegend(result);
        const points = await getActualWarnAreaTableData(params);
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
        const { filepath } = await getActualVillageDataExport({
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

export default useActualArea;
