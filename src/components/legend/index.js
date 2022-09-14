/*
 * @Author: zhangyang
 * @Date: 2021-07-02 10:43:46
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-07-02 10:44:22
 * @Description: file content
 */
import Legend from './legend.vue';

/* istanbul ignore next */
Legend.install = function (Vue) {
    Vue.component(Legend.name, Legend);
};

export default Legend;