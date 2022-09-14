/*
 * @Author: zhangyang
 * @Date: 2021-08-13 15:48:58
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-08-13 18:07:56
 * @Description: file content
 */
const useProphesy = (data) => {
    const { contours: baseData } = data;

    const features = baseData.map(setData);

    return {
        color: [
            [164, 245, 140, 0.6],
            [58, 164, 2, 0.6],
            [113, 180, 232, 0.6],
            [3, 0, 255, 0.6],
            [250, 0, 252, 0.6]
        ],
        colorLabel: [
            "小雨",
            "中雨",
            "大雨",
            "暴雨",
            "大暴雨"
        ],
        contour: [0, 10, 25, 50, 100],
        features
    };
}

const setData = (item) => {
    const { latAndLong, symbol, color } = item;

    return {
        geometry: {
            coordinates: [latAndLong.map(item => [item[1], item[0]])],
            type: "Polygon"
        },
        type: "Feature",
        properties: {
            color: color.split(',').map((item, index) => {
                if (index === 3) return 0.6;

                return item - 0;
            }),
            value: symbol - 0
        }
    }
}

export default useProphesy;