/*
 * @Author: zhangxin
 * @Date: 2022-07-06 11:33:34
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-20 17:21:41
 * @Description: 
 */

import { layer } from "mars3d";
const { ImageLayer, WmsLayer } = layer;

const { VUE_APP_ARCGIS_ICMSERVER } = process.env;

// 47_0_zones    进度条
// 47_Max_zones  最不利
const createIcmLayer = ({ id, params }) => {
    return new ImageLayer({
        id,
        name: "Icm",
        url: `${VUE_APP_ARCGIS_ICMSERVER}/geoserver/hwICM/wms?service=WMS&version=1.1.0&request=GetMap&layers=hwICM:${params}&bbox=19301.124021557513,3587.9883213990324,19706.412948317404,4268.215653692042&width=457&height=768&srs=EPSG:32651&format=image/png&transparent=true`,
        opacity: 0,
        // bbox: [19301.124021557513, 3587.9883213990324, 19706.412948317404, 4268.215653692042],
        tileWidth: 457,
        tileHeight: 768,
        rectangle: {
            // xmin: 113.34406,
            // ymin: 35.9589,
            // xmax: 119.93586,
            // ymax: 42.74581,
            xmin: 115.3768,
            ymin: 39.955078,
            xmax: 117.4754,
            ymax: 41.204025,
        }
    });
}

export function useIcmModelMap(mapview) {
    const IcmModelLayers = [];

    const layerToMapview = (layer) => {
        // mapview.addLayer(layer);
        layer.addTo(mapview);
        IcmModelLayers.push(layer);
        return layer;
    }

    const flytoIcmLayer = (layers) => {
        const [first] = layers;
        first.flyTo({ scale: 1.2 });
    }

    const clearIcmLayer = () => {
        IcmModelLayers.forEach(layer => {
            layer.destroy(true);
            layer.remove(true);
        });
        IcmModelLayers.splice(0);
    }

    const setupIcmLayer = (datasource) => {
        clearIcmLayer();
        const layers = datasource.map(createIcmLayer).map(layerToMapview);
        return layers;
    }

    const findIcmLayer = (raw) => {
        if (!mapview.hasLayer(raw?.id)) return;

        return mapview.getLayerById(raw.id);
    }

    return {
        layerToMapview,
        flytoIcmLayer,
        clearIcmLayer,
        setupIcmLayer,
        findIcmLayer
    }
}