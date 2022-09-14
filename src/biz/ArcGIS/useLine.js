/*
 * @FilePath: \3D防汛作战\src\biz\ArcGIS\useLine.js
 * @Author: zhangyang
 * @Date: 2022-06-17 15:03:23
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-17 17:05:03
 * @Description: 
 */
import {onBeforeUnmount} from "@vue/composition-api";
import { graphic } from "mars3d";
import {
    queryArcGIS,
    setupLabelKey
} from "./share";

const {PolylineEntity} = graphic;

export default function useArcGISLine(options = {}) {
    const {
        find,
        clear,
        service,
        serviceID,
        setupShapeEntity,
        setupShapeStyle
    } = options;
    const layer = find();

    const url = `${service ?? ""}/${serviceID ?? 0}/query`;
    
    async function setupShape() {
        clear();
        const { features } = await queryArcGIS(url);
        const linesource = features.map((item, index) => {
            const {geometry } = item;
            const { id, name, attr } = setupShapeEntity(item, index);
            return new PolylineEntity({
                attr,
                id:setupLabelKey(id),
                name:setupLabelKey(name),
                style: setupShapeStyle(item,index),
                positions: geometry?.paths[0]??[],
            });
        });
        layer.addGraphic(linesource);
        layer.flyTo();
    }

    onBeforeUnmount(() => {
        clear();
    });

    return {
        layer,
        setupShape
    }
}
