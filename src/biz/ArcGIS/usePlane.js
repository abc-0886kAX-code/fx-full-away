/*
 * @FilePath: \3D防汛作战\src\biz\ArcGIS\usePlane.js
 * @Author: zhangyang
 * @Date: 2022-06-17 15:03:28
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-17 17:23:06
 * @Description: 
 */
import {onBeforeUnmount} from "@vue/composition-api";
import { graphic } from "mars3d";
import {flattenDepth } from "lodash";
import {
    queryArcGIS,
    setupLabelKey
} from "./share";

const { Water } = graphic;

export default function useArcGISPlane(options = {}) {
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
        const {features} = await queryArcGIS(url);
        const linesource = features.map((item, index) => {
            const {geometry } = item;
            const { id, name, attr } = setupShapeEntity(item, index);
            const positions = geometry?.rings ?? [];
            return positions.map((pos, i) => {
                return new Water({
                    attr,
                    id:setupLabelKey(id),
                    name:setupLabelKey(name),
                    style: setupShapeStyle(item,i),
                    positions: pos,
                });
            });
        });
        layer.addGraphic(flattenDepth(linesource));
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
