/*
 * @FilePath: \3D防汛作战\src\biz\Mars3D\usecase\useMask.js
 * @Author: zhangyang
 * @Date: 2022-06-21 10:08:49
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-15 13:12:17
 * @Description: 
 */
import { cacheGet } from "maggot-utils";
import { isString } from "lodash";
import { Cesium, layer } from "mars3d";

const { ArcType } = Cesium;
const { GeoJsonLayer } = layer;

export function useMask(mapview) {
    const cacheCode = cacheGet("addvcd");
    const code = isString(cacheCode) ? cacheCode : "";
    const notEmpty = code.length > 0;

    if (notEmpty) {
        const maskLayer = new GeoJsonLayer({
            // url:"https://data.mars3d.cn/file/geojson/areas/110117.json",
            url: `/mask/areas/${code}.json`,
            mask: true,
            zIndex: 10001,
            symbol: {
                styleOptions: {
                    fill: true,
                    color: "rgb(2,26,79)",
                    opacity: process.env.NODE_ENV === 'production' ? 1.0 : 0.6,
                    outline: true,
                    outlineColor: "#39E09B",
                    outlineWidth: 2,
                    outlineOpacity: 0.8,
                    arcType: ArcType.GEODESIC,
                    clampToGround: true
                }
            }
        });
        mapview.addLayer(maskLayer);
    }

    return {}
}
