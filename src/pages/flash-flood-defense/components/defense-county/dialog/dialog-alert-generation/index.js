/*
 * @Author: zhangxin
 * @Date: 2022-06-27 17:35:24
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-27 17:36:44
 * @Description: 
 */
import DialogAlertGeneration from './dialog-alert-generation.vue';

DialogAlertGeneration.install = function (Vue) {
    Vue.component(DialogAlertGeneration.name, DialogAlertGeneration);
};

export default DialogAlertGeneration;