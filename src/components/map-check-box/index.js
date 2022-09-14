/*
 * @Author: zhangyang
 * @Date: 2021-05-21 13:32:38
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-21 13:37:14
 * @Description: file content
 */
import MapCheckBox from './map-check-box.vue';

/* istanbul ignore next */
MapCheckBox.install = function (Vue) {
    Vue.component(MapCheckBox.name, MapCheckBox);
};

export default MapCheckBox;