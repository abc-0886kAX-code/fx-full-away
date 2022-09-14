/*
 * @Author: maggot-code
 * @Date: 2022-05-23 14:08:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-05-23 14:19:47
 * @Description: file content
 */
import RadarEachoMap from './radar-echo-map.vue';

RadarEachoMap.install = function (Vue) {
    Vue.component(RadarEachoMap.name, RadarEachoMap);
};

export default RadarEachoMap;