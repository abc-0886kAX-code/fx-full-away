/*
 * @FilePath: \3D防汛作战\src\biz\ArcGIS\share.js
 * @Author: zhangyang
 * @Date: 2022-06-17 17:04:03
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-17 17:04:38
 * @Description: 
 */
import { send } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";

import { flake } from "maggot-utils";
import {isNil,isString} from "lodash";

export const queryArcGIS = (url) => send({
    url,
    method: "GET",
    tag: "arcgis",
    params: {
        where:"1=1",
        f: "json",
        geometryType: "esriGeometryEnvelope",
        spatialRel: "esriSpatialRelIntersects",
        outFields: "*",
        outSR: 4326,
        returnGeometry: true,
        returnTrueCurves: false,
        returnIdsOnly: false,
        returnCountOnly: false,
        returnZ: false,
        returnM: false,
        returnDistinctValues: false
    }
}).then(analysisResponse);

export function setupLabelKey(field) {
    if (isNil(field)) return flake.gen();

    const spare = isString(field) ? field : field.toString();
    const value = spare.trim();
    const empty = value.length <= 0;

    return empty ? flake.gen() : value;
}
