/*
 * @Author: zhangyang
 * @Date: 2022-04-26 15:34:17
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-17 16:18:02
 * @Description: file content
 */
import { unref, computed, onMounted } from '@vue/composition-api';
import { LayerUtil } from 'mars3d';

const { VUE_APP_ROOT_LAYERID } = process.env;

const handlerLayerPid = () => +VUE_APP_ROOT_LAYERID;
const handlerLayerId = (pid, index) => pid + index + 1;
export const handlerLayerConfig = (conf, index) => {
    const pid = handlerLayerPid();

    return LayerUtil.create(
        Object.assign(
            {},
            {
                show: true,
                id: handlerLayerId(pid, index),
                pid,
            },
            conf
        )
    );
};
export const addLayer = (layer, mapview) => {
    if (mapview.hasLayer(layer.id)) return;
    mapview.addLayer(layer);
};

export function useLayerSetup(props, mapview) {
    const layerGroup = computed(() => {
        return [
            // {
            //     type: "osmBuildings",
            //     name: "osmBuildingsLayer",
            // },
            ...props.layers,
        ];
    });

    const layers = unref(layerGroup).map(handlerLayerConfig);

    onMounted(() => {
        layers.forEach(layer => addLayer(layer, unref(mapview.view)));
    });
}
