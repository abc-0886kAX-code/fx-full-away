/*
 * @Author: zhangyang
 * @Date: 2021-05-26 15:06:39
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-26 15:06:39
 * @Description: file content
 */
import BizTable from './biz-table.vue';

/* istanbul ignore next */
BizTable.install = function (Vue) {
    Vue.component(BizTable.name, BizTable);
};

export default BizTable;