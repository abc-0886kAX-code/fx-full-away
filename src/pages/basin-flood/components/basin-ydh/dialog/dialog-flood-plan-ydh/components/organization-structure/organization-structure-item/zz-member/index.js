/*
 * @Author: zhangxin
 * @Date: 2022-04-14 11:19:13
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-14 16:32:52
 * @Description: 
 */

import ZzMember from './zz-member.vue';

/* istanbul ignore next */
ZzMember.install = function (Vue) {
    Vue.component(ZzMember.name, ZzMember);
};

export default ZzMember;


