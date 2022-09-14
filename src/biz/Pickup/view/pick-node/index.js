/*
 * @FilePath: \3D防汛作战\src\biz\Pickup\view\pick-node\index.js
 * @Author: zhangyang
 * @Date: 2022-06-16 16:29:27
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-16 16:29:52
 * @Description: 
 */
import PickNode from './pick-node.vue';

/* istanbul ignore next */
PickNode.install = function (Vue) {
    Vue.component(PickNode.name, PickNode);
};

export default PickNode;
