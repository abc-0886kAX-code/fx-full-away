/*
 * @Author: zhangyang
 * @Date: 2021-06-30 15:46:26
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-30 15:47:21
 * @Description: file content
 */
import RadioPanel from './radio-panel.vue';

/* istanbul ignore next */
RadioPanel.install = function (Vue) {
    Vue.component(RadioPanel.name, RadioPanel);
};

export default RadioPanel;