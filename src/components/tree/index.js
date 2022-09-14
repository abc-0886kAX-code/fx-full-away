/*
 * @Author: zhangyang
 * @Date: 2021-06-28 11:28:31
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-28 11:29:06
 * @Description: file content
 */
import Tree from './tree.vue';

/* istanbul ignore next */
Tree.install = function (Vue) {
    Vue.component(Tree.name, Tree);
};

export default Tree;