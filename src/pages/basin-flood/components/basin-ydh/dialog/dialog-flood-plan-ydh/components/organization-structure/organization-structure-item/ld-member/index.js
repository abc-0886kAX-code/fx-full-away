/*
 * @Author: zhangxin
 * @Date: 2022-04-14 11:19:13
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-14 16:15:33
 * @Description: 
 */

import LdMember from './ld-member.vue';

/* istanbul ignore next */
LdMember.install = function (Vue) {
    Vue.component(LdMember.name, LdMember);
};

export default LdMember;


