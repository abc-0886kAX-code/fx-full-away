/*
 * @Author: zhangyang
 * @Date: 2022-04-29 09:22:51
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-29 09:22:52
 * @Description: file content
 */
import FloatWindow from './float-window.vue';

/* istanbul ignore next */
FloatWindow.install = function (Vue) {
    Vue.component(FloatWindow.name, FloatWindow);
};

export default FloatWindow;