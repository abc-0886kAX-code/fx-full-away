/*
 * @Author: zhangyang
 * @Date: 2021-06-10 11:07:47
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-10 11:08:14
 * @Description: file content
 */
import BizPage from './src/page.vue';

/* istanbul ignore next */
BizPage.install = function (Vue) {
    Vue.component(BizPage.name, BizPage);
};

export default BizPage;