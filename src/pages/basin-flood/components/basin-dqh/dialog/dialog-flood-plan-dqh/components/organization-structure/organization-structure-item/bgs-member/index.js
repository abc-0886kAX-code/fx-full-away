/*
 * @Author: zhangxin
 * @Date: 2022-04-14 11:19:13
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-14 16:31:59
 * @Description: 
 */

import BgsMember from './bgs-member.vue';

/* istanbul ignore next */
BgsMember.install = function (Vue) {
    Vue.component(BgsMember.name, BgsMember);
};

export default BgsMember;


