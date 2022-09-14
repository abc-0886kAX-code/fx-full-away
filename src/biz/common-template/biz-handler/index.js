/*
 * @Author: zhangyang
 * @Date: 2021-06-10 11:07:18
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-10 11:07:43
 * @Description: file content
 */
import BizHandler from './src/handler.vue';

/* istanbul ignore next */
BizHandler.install = function (Vue) {
    Vue.component(BizHandler.name, BizHandler);
};

export default BizHandler;