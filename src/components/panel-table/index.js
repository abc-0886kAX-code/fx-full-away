/*
 * @Author: zhangyang
 * @Date: 2022-04-21 09:44:31
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-21 09:44:31
 * @Description: file content
 */
import PanelTable from './panel-table.vue';

/* istanbul ignore next */
PanelTable.install = function (Vue) {
    Vue.component(PanelTable.name, PanelTable);
};

export default PanelTable;