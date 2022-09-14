/*
 * @Author: zhangxin
 * @Date: 2022-07-12 10:54:28
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-13 14:52:20
 * @Description: 
 */
import { layer } from "mars3d";
const { ImageLayer, WmsLayer } = layer;

const { VUE_APP_ARCGIS_ICMSERVER } = process.env;

const createIcmLayer = ({ id, params }) => {
    return new ImageLayer({
        id,
        name: "Icm",
        url: `${VUE_APP_ARCGIS_ICMSERVER}/geoserver/hwICM/wms?service=WMS&version=1.1.0&request=GetMap&layers=hwICM:${params}&bbox=19301.124021557513,3587.9883213990324,19706.412948317404,4268.215653692042&width=457&height=768&srs=EPSG:32651&format=image/png&transparent=true`,
        opacity: 1,
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

// const createIcmWmsLayer = ({ id, params }) => {
//     return new WmsLayer({
//         id,
//         name: "Icm",
//         url: `${VUE_APP_ARCGIS_ICMSERVER}/geoserver/hwICM/wms`,
//         opacity: 1,
//         parameters: {
//             format: 'image/png',
//             transparent: true,
//             layers: `hwICM:${params}`,
//             request: 'GetMap',
//             version: '1.1.1',
//             service: 'WMS',
//             excepitons: 'application/vnd.ogc.se_inimage',
//             srs: 'EPSG:4326',
//             Width: 457,
//             Height: 768,
//             bbox: '19301.124021557513, 3587.9883213990324, 19706.412948317404, 4268.215653692042',
//         },
//     });
// }

export function useUnfavorableLayerRender(mapview) {
    const useUnfavorableLayer = []
    const clearUnfavorableLayer = () => {
        useUnfavorableLayer.forEach(layer => {
            layer.destroy(true);
            layer.remove(true);
        })
    }

    const setupUnfavorableLayer = (datasource) => {
        clearUnfavorableLayer();
        const layer = createIcmLayer(datasource).addTo(mapview);
        useUnfavorableLayer.push(layer);
        return layer;
    }

    return {
        setupUnfavorableLayer,
        clearUnfavorableLayer
    }
}