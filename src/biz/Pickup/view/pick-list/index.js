/*
 * @FilePath: \3D防汛作战\src\biz\Pickup\view\pick-list\index.js
 * @Author: zhangyang
 * @Date: 2022-06-16 16:27:48
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-16 16:28:12
 * @Description: 
 */
import PickList from './pick-list.vue';

/* istanbul ignore next */
PickList.install = function (Vue) {
    Vue.component(PickList.name, PickList);
};

export default PickList;
