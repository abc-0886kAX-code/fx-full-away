/*
 * @FilePath: \防汛大屏\src\plugins\vxe-table-config\index.js
 * @Author: zhangxin
 * @Date: 2022-08-11 14:20:28
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-15 10:32:10
 * @Description:
 */
import Vue from 'vue';
import { VXETable, Column, Table } from 'vxe-table';
import XEUtils from 'xe-utils';
import zhLocale from 'vxe-table/lib/locale/lang/zh-CN';
import 'vxe-table/lib/style.css';

Vue.use(Column);
Vue.use(Table);

// 按需加载的方式默认是不带国际化的，需要自行导入
VXETable.setup({
    zIndex: 9999999,
    i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhLocale, key), args),
});
