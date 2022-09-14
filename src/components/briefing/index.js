/*
 * @Author: zhangxin
 * @Date: 2022-04-28 16:35:45
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-05 17:46:57
 * @Description: 
 */
import { default as Briefing } from './briefing.vue';

/* istanbul ignore next */
Briefing.install = function (Vue) {
    Vue.component(Briefing.name, Briefing);
};

export default Briefing;