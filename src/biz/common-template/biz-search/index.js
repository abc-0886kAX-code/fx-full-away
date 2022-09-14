/*
 * @Author: zhangyang
 * @Date: 2021-06-10 11:08:17
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-10 13:25:11
 * @Description: file content
 */
import BizSearch from './src/search.vue';

/* istanbul ignore next */
BizSearch.install = function (Vue) {
    Vue.component(BizSearch.name, BizSearch);
};

export { }

export default BizSearch;