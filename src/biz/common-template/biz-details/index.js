/*
 * @Author: zhangyang
 * @Date: 2021-06-10 11:06:34
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-10 11:07:08
 * @Description: file content
 */
import BizDetails from './src/details.vue';

/* istanbul ignore next */
BizDetails.install = function (Vue) {
    Vue.component(BizDetails.name, BizDetails);
};

export default BizDetails;