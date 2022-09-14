/*
 * @Author: zhangyang
 * @Date: 2021-05-13 10:28:11
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-13 10:36:41
 * @Description: file content
 */
import Dialog from './dialog.vue';

/* istanbul ignore next */
Dialog.install = function (Vue) {
    Vue.component(Dialog.name, Dialog);
};

export default Dialog;