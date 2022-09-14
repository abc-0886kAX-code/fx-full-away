/*
 * @Author: zhangxin
 * @Date: 2022-04-14 11:19:13
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-14 13:35:34
 * @Description: 
 */

import Flood from './flood.vue';

/* istanbul ignore next */
Flood.install = function (Vue) {
    Vue.component(Flood.name, Flood);
};

export default Flood;


