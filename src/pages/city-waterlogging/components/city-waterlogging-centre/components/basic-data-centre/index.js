/*
 * @Author: zhangxin
 * @Date: 2022-06-30 10:16:22
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-30 10:17:16
 * @Description: 
 */
import BasicDataCentre from './basic-data-centre.vue';

BasicDataCentre.install = function (Vue) {
    Vue.component(BasicDataCentre.name, BasicDataCentre);
};

export default BasicDataCentre;