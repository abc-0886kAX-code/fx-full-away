/*
 * @FilePath: \3D防汛作战\src\pages\real-time-monitor\components\real-time-rainfall-isosurface\index.js
 * @Author: zhangyang
 * @Date: 2022-06-23 15:09:41
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-23 15:11:26
 * @Description: 
 */
import RealTimeRainfallIsosurface from './real-time-rainfall-isosurface.vue';

RealTimeRainfallIsosurface.install = function (Vue) {
    Vue.component(RealTimeRainfallIsosurface.name, RealTimeRainfallIsosurface);
};

export default RealTimeRainfallIsosurface;
