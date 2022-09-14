/*
 * @Author: zhangxin
 * @Date: 2022-06-20 16:50:50
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-20 16:52:43
 * @Description: 
 */
import RainfallSite from './rainfall-site.vue';

/* istanbul ignore next */
RainfallSite.install = function (Vue) {
    Vue.component(RainfallSite.name, RainfallSite);
};

export default RainfallSite;