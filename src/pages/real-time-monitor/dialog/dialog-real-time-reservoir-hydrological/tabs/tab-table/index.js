/*
 * @Author: zhangxin
 * @Date: 2022-05-26 14:22:18
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-26 14:24:15
 * @Description: 
 */
import TabTable from './tab-table.vue';

/* istanbul ignore next */
TabTable.install = function (Vue) {
    Vue.component(TabTable.name, TabTable);
};

export default TabTable;