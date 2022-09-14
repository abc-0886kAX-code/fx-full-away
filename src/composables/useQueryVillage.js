/*
 * @Author: zhangxin
 * @Date: 2022-06-27 17:17:25
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-28 11:04:44
 * @Description: 
 */
import { queryArcGIS } from "@/biz/ArcGIS/share";
import { VILLAGE_SERVICE } from "@/config/arcgis.conf";
import { send } from "@/plugins/axios";
import { analysisResponse } from "@/utils/business";

export function useQueryVillage(ID) {

    const queryBJVillageBoundary = async () => {
        const data = await queryArcGIS(`${VILLAGE_SERVICE}/${ID}`)
        const { extent } = data;
        return {
            geometry: extent
        }
    };


    const queryBJAllVillage = async (params) => send({
        url: `${VILLAGE_SERVICE}/${ID}/query`,
        method: "GET",
        tag: "arcgis",
        params: {
            f: "json",
            ...params,
            orderByFields: "FID",
            outFields: "*",
            outSR: 102100,
            resultType: "tile",
            returnExceededLimitFeatures: false,
            spatialRel: "esriSpatialRelIntersects",
            where: "1=1",
            geometryType: "esriGeometryEnvelope",
            inSR: 102100
        }
    }).then(analysisResponse)


    const getAllVillage = async () => {
        const params = await queryBJVillageBoundary();
        const data = await queryBJAllVillage(params);
        const { features } = data;

        return features.map(item => {
            return item.attributes;
        });
    }


    return {
        getAllVillage
    }
}