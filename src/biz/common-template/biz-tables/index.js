/*
 * @Author: zhangyang
 * @Date: 2021-06-10 11:08:44
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-10 11:09:04
 * @Description: file content
 */
import BizTables from './src/tables.vue';

/* istanbul ignore next */
BizTables.install = function (Vue) {
    Vue.component(BizTables.name, BizTables);
};

export default BizTables;