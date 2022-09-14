/*
 * @Author: zhangyang
 * @Date: 2022-05-13 16:35:16
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-05-13 17:54:24
 * @Description: file content
 */
import { send } from "@/plugins/axios";
import { retainServiceBody, RIVER_SERVICE } from "@/config/arcgis.conf";

function setupWhereParams(data) {
    const where = data.map(item => item.rivername);
    return `1=1 and 普查名称 in ('${where.join("','")}')`;
}

function setupPositionSort(positions) {
    return positions.sort((a, b) => a.length - b.length);
}

export function useRivermap() {
    const compressData = (data) => (shapes) => {
        const shapesData = data.map(item => {
            const { rivername } = item;
            const [shape] = shapes.filter(shape => shape.attributes["普查名称"] === rivername);

            if (!shape) return { ...item, rivername: `${rivername}(无)`, isShape: false }

            return {
                ...item,
                rivername: `${rivername}(有)`,
                isShape: true,
                shape: {
                    ...shape,
                    positions: setupPositionSort(
                        shape.geometry?.paths
                        ?? shape.geometry?.rings
                        ?? []
                    )
                }
            }
        });

        return { shapesData, shapes, data };
    }

    const queryArcGISRiverMap = (data) => send({
        url: `${retainServiceBody(RIVER_SERVICE)}/0/query`,
        method: "GET",
        tag: "arcgis",
        params: {
            where: setupWhereParams(data),
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
    })
        .then(res => res.data.features ?? [])
        .then(compressData(data))
        .catch(error => {
            console.log(error);
            return [];
        });

    return {
        queryArcGISRiverMap,
        compressData
    }
}