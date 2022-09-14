/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\usecase\useOutputImage.js
 * @Author: zhangyang
 * @Date: 2022-08-08 11:27:13
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 11:34:47
 * @Description: 
 */
import { unref } from "@vue/composition-api";
import { useScreenshot } from "@/biz/Mars3D/usecase/useScreenshot";

import { base64ToBlob } from "@/utils/business";
import { Cesium, LngLatPoint } from "mars3d";
import html2canvas from "html2canvas";

function transformCoordinate(mapview, layer) {
    const { xmin, xmax, ymin, ymax } = layer.getRectangle(true);
    //笛卡尔空间直角坐标 转换为 屏幕坐标
    const { x: minX, y: minY } =
        Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            unref(mapview).scene,
            LngLatPoint.toCartesian([xmin, ymin])
        );
    const { x: maxX, y: maxY } =
        Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            unref(mapview).scene,
            LngLatPoint.toCartesian([xmax, ymax])
        );

    return {
        min: [minX, minY],
        max: [maxX, maxY],
    };
}

function getImage(mapview) {
    return unref(mapview).expImage({
        download: false,
        encoderOptions: 1,
    });
}

async function getLegend(id) {
    const legend = await html2canvas(document.getElementById(id), {
        useCORS: true,
        allowTaint: true,
        removeContainer: false,
        scale: 1,
    });

    return Promise.resolve({
        image: legend.toDataURL(),
        width: legend.width,
        height: legend.height,
    });
}

export function useOutputImage(mapview, options = {}) {
    const {
        layer,
        legendId,
    } = options;
    const { setupBinaryImg, setupScreenshotImage } = useScreenshot(mapview);

    async function setupOutputImage() {
        layer.flyTo({
            scale: 1.5,
            duration: 0,
            pitch: -90,
            heading: 0,
            roll: 0,
        });
        const { min, max } = transformCoordinate(mapview, layer);
        const [map, legend] = await Promise.allSettled([
            getImage(mapview),
            getLegend(legendId),
        ]);
        const { width, height } = map.value;
        setupBinaryImg({
            map: map.value,
            legend: legend.value,
            width,
            height,
            min,
            max,
        });
        const imgData = await setupScreenshotImage(false);
        const files = base64ToBlob(imgData);

        return {
            files,
            imgData
        }
    }

    return {
        setupOutputImage
    }
}

export default useOutputImage;
