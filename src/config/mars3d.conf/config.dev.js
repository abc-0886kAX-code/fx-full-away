/*
 * @Author: zhangyang
 * @Date: 2022-04-24 12:15:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-17 17:05:17
 * @Description: mars3d.config.Dev
 */
import { CRS } from 'mars3d';
import black_basemap from '@/assets/icon/basemap/black_basemap.png';
import blue_basemap from '@/assets/icon/basemap/blue_basemap.png';
import darkcolor_basemap from '@/assets/icon/basemap/darkcolor_basemap.png';
import electronics_basemap from '@/assets/icon/basemap/electronics_basemap.png';
import image_basemap from '@/assets/icon/basemap/image_basemap.png';
import solidcolor_basemap from '@/assets/icon/basemap/solidcolor_basemap.png';
const { VUE_APP_TIANMAPKEY, VUE_APP_CESIUMTOKEN, VUE_APP_ROOT_LAYERID } = process.env;
export default mode => {
    const config = {
        scene: {
            globe: {
                show: true,
                baseColor: '#333333',
                depthTestAgainstTerrain: true,
                showGroundAtmosphere: true,
                enableLighting: false,
                tileCacheSize: 1024,
                terrainExaggeration: 1.0,
                terrainExaggerationRelativeHeight: 0.0,
            },
            cameraController: {
                zoomFactor: 3.0,
                constrainedAxis: true,
                minimumZoomDistance: 1.0,
                maximumZoomDistance: 50000000.0,
                minimumCollisionTerrainHeight: 80000,
                enableRotate: true,
                enableTranslate: true,
                enableTilt: true,
                enableZoom: true,
                enableCollisionDetection: true,
            },
            removeDblClick: true,
            ionToken: VUE_APP_CESIUMTOKEN,
            resolutionScale: 1.0,
            showSun: true,
            showMoon: true,
            showSkyBox: true,
            showSkyAtmosphere: true,
            fog: true,
            fxaa: true,
            highDynamicRange: false,
            backgroundColor: '#333333',
            sceneMode: mode,
            scene3DOnly: false,
            shouldAnimate: true,
            shadows: false,
            useDefaultRenderLoop: true,
            targetFrameRate: 60,
            useBrowserRecommendedResolution: true,
            automaticallyTrackDataSourceClocks: true,
            orderIndependentTranslucency: true,
            requestRenderMode: true,
        },
        mouseOptionsmap: {
            enabledMoveTarget: true,
            moveDelay: 0,
        },
        control: {
            // locationBar: {
            //     fps: true,
            //     crs: "CGCS2000_GK_Zone_3",
            //     crsDecimal: 0,
            //     template: "<div>经度：{lng}</div> <div>纬度：{lat}</div> <div class='hide1000'>横：{crsx}  纵：{crsy}</div> <div>海拔：{alt}米</div> <div class='hide700'>层级：{level}</div> <div>方向：{heading}°</div> <div>俯仰角：{pitch}°</div> <div class='hide700'>视高：{cameraHeight}米</div>"
            // },
            // compass: { bottom: "375px", left: "35px" },
            // distanceLegend: { bottom: "30px", left: "0px", },
            zoom: {
                insertIndex: 1,
            },
            defaultContextMenu: true,
            mouseDownView: true,
            infoBox: false,
            selectionIndicator: false, // 选择实体的时候是否显示标记框
            animation: false,
            timeline: false,
            baseLayerPicker: true,
            fullscreenButton: true,
            vrButton: false,
            geocoder: true,
            homeButton: true,
            sceneModePicker: mode === 3,
            projectionPicker: false,
            navigationHelpButton: true,
            navigationInstructionsInitiallyVisible: false,
            showRenderLoopErrors: true,
        },
        terrain: {
            url: 'http://data.mars3d.cn/terrain',
            requestWaterMask: true,
            requestVertexNormals: true,
            show: true,
        },
        basemaps: [
            {
                type: 'group',
                id: 10,
                name: '功能图层',
            },
            {
                show: false,
                name: '测试底图',
                icon: image_basemap,
                type: 'wmts',
                url: 'http://192.1.1.58:9001/bigemap.del497ss/wmts',
                layer: 'bigemap.other',
                style: 'default',
                format: 'image/png',
                crs: CRS.EPSG3857,
                tileMatrixSetID: '1to18',
                queryParameters: {
                    access_token:
                        'pk.eyJ1IjoiY3VzXzZ4ZWM0N3QyIiwiYSI6IjcxdHV5ajFwb3hhaXhxMTYzZTNhdnQwazciLCJ0IjoxfQ.urawCp9-G7ngB4irur55OZkLI7uBYZz40U-9oF30CkQ',
                },
            },
            {
                show: true,
                type: 'group',
                pid: 10,
                id: 11,
                name: '影像底图',
                icon: image_basemap,
                layers: [
                    {
                        type: 'tdt',
                        pid: 11,
                        id: 12,
                        name: '天地图-影像图',
                        layer: 'img_d',
                        key: [VUE_APP_TIANMAPKEY],
                    },
                    {
                        type: 'tdt',
                        pid: 11,
                        id: 13,
                        name: '天地图-影像图标注',
                        layer: 'img_z',
                        key: [VUE_APP_TIANMAPKEY],
                    },
                ],
            },
            {
                type: 'group',
                pid: 10,
                id: 14,
                name: '电子底图',
                icon: electronics_basemap,
                layers: [
                    {
                        type: 'tdt',
                        pid: 14,
                        id: 15,
                        name: '天地图-电子图',
                        layer: 'vec_d',
                        key: [VUE_APP_TIANMAPKEY],
                    },
                    {
                        type: 'tdt',
                        pid: 14,
                        id: 16,
                        name: '天地图-电子图标注',
                        layer: 'vec_z',
                        key: [VUE_APP_TIANMAPKEY],
                    },
                ],
            },
            {
                type: 'gaode',
                id: 17,
                pid: 10,
                name: '暗色底图',
                icon: darkcolor_basemap,
                layer: 'vec',
                invertColor: true,
                filterColor: '#4e70a6',
                brightness: 0.6,
                contrast: 1.8,
                gamma: 0.3,
                hue: 1,
                saturation: 0,
            },
            {
                type: 'xyz',
                id: 18,
                pid: 10,
                name: '蓝色底图',
                icon: blue_basemap,
                url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
                chinaCRS: 'GCJ02',
                enablePickFeatures: false,
            },
            {
                type: 'tencent',
                id: 19,
                pid: 10,
                name: '黑色底图',
                icon: black_basemap,
                layer: 'custom',
                style: '4',
            },
            {
                name: '纯色底图',
                icon: solidcolor_basemap,
                type: 'gaode',
                layer: 'vec',
                invertColor: true, // 反向颜色 color.r = 1.0 - color.r
                filterColor: '#000000', // 滤镜颜色  color.r = color.r * filterColor.r
                brightness: 0.6,
                contrast: 1.8,
                gamma: 0.3,
                hue: 1,
                saturation: 0,
            },
        ],
        layers: [
            {
                type: 'group',
                id: 100,
                name: 'SupportLayerGroup',
            },
            // {
            //     show: false,
            //     type: 'xyz',
            //     pid: 100,
            //     id: 101,
            //     name: 'DistrictBorderLayer',
            //     url: `https://t{s}.tianditu.gov.cn/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=${VUE_APP_TIANMAPKEY}`,
            //     subdomains: '01234567',
            //     maximumLevel: 10,
            // },
            {
                type: 'group',
                id: +VUE_APP_ROOT_LAYERID,
                name: 'BusinessLayerGroup',
            },
        ],
    };

    return config;
};
