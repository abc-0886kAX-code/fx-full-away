/*
 * @Author: zhangxin
 * @Date: 2022-05-26 14:22:18
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-26 14:25:27
 * @Description: 
 */
import TabDetails from './tab-details.vue';

/* istanbul ignore next */
TabDetails.install = function (Vue) {
    Vue.component(TabDetails.name, TabDetails);
};

export default TabDetails;