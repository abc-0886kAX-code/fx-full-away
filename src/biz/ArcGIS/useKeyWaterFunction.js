/*
 * @Author: zhangyang
 * @Date: 2022-05-11 15:28:06
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-05-13 17:32:38
 * @Description: file content
 */
import { send } from "@/plugins/axios";
import { retainServiceBody } from "@/config/arcgis.conf";

function setupWhereParams(data) {
    const where = data.map(item => item.name);
    return `1=1 and Name in ('${where.join("','")}')`;
    // return `1=1`;
}

function setupPositionSort(positions) {
    return positions.sort((a, b) => a.length - b.length);
}

export function useKeyWaterFunction(id, server) {
    const compressData = (data) => (shapes) => {
        const shapesData = data.map(item => {
            const { name } = item;
            const [shape] = shapes.filter(shape => shape.attributes.Name === name);

            if (!shape) return { ...item, name: `${name}(无)`, isShape: false }

            return {
                ...item,
                name: `${name}(有)`,
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

    const queryArcGISWaterFunction = (data) => send({
        url: `${retainServiceBody(server)}/${id}/query`,
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
        queryArcGISWaterFunction,
        compressData
    }
}