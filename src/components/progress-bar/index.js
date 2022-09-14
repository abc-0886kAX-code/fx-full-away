/*
 * @Author: zhangyang
 * @Date: 2021-07-16 10:52:46
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-07-16 10:54:25
 * @Description: file content
 */
import ProgressBar from './progress-bar.vue';

/* istanbul ignore next */
ProgressBar.install = function (Vue) {
    Vue.component(ProgressBar.name, ProgressBar);
};

export default ProgressBar;