/*
 * @Author: zhangyang
 * @Date: 2021-05-13 10:44:25
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-13 10:45:34
 * @Description: file content
 */
import Empty from './empty.vue';

/* istanbul ignore next */
Empty.install = function (Vue) {
    Vue.component(Empty.name, Empty);
};

export default Empty;