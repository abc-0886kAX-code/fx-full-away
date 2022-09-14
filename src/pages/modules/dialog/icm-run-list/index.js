/*
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-plan-query\index.js
 * @Author: zhangyang
 * @Date: 2022-06-30 16:02:33
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-30 16:04:50
 * @Description: 
 */
import IcmRunList from './icm-run-list.vue';

/* istanbul ignore next */
IcmRunList.install = function (Vue) {
    Vue.component(IcmRunList.name, IcmRunList);
};

export default IcmRunList;
