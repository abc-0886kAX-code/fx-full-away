/*
 * @FilePath: \3D防汛作战\src\biz\Pickup\view\pick-container\index.js
 * @Author: zhangyang
 * @Date: 2022-06-16 15:58:18
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-16 15:59:10
 * @Description: 
 */
import PickContainer from './pick-container.vue';

/* istanbul ignore next */
PickContainer.install = function (Vue) {
    Vue.component(PickContainer.name, PickContainer);
};

export default PickContainer;
