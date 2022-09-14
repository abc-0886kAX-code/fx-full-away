/*
 * @Author: zhangxin
 * @Date: 2022-05-23 15:20:01
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-23 15:21:12
 * @Description: 
 */
import DialogRealTimeRainfall from "./dialog-real-time-rainfall.vue";

/* istanbul ignore next */
DialogRealTimeRainfall.install = function (Vue) {
    Vue.component(DialogRealTimeRainfall.name, DialogRealTimeRainfall);
};

export default DialogRealTimeRainfall;