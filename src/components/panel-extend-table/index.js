/*
 * @Author: zhangyang
 * @Date: 2022-04-22 09:50:10
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-22 09:50:10
 * @Description: file content
 */
import PanelExtendTable from './panel-extend-table.vue';

/* istanbul ignore next */
PanelExtendTable.install = function (Vue) {
    Vue.component(PanelExtendTable.name, PanelExtendTable);
};

export default PanelExtendTable;