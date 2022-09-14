/*
 * @FilePath: \3D防汛作战\src\biz\Pickup\entity\Legend.js
 * @Author: zhangyang
 * @Date: 2022-06-16 16:26:33
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-16 16:44:33
 * @Description: 
 */
// arcgis 图例
export const ArcGISLegend = {
    type: "arcgis",
    url: "",
    params:{}
}

// 样式图例
export const StyleLegend = {
    type: "style",
    shape: "circle", // [circle(圆圈), square(正方形), triangle(三角形), line(线), double(双线)]
    color:[0,0,0,0], // [r,g,b,a]
}
export default ArcGISLegend;
