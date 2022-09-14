/*
 * @Author: zhangyang
 * @Date: 2021-06-11 09:17:49
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-02-14 09:20:21
 * @Description: file content
 */
import { default as BizPage } from './biz-page';
import { default as BizPageLayout } from './biz-page-layout';
import { default as BizSearch } from './biz-search';
import { default as BizSearchSetup } from './biz-search-setup';
import { default as BizHandler } from './biz-handler';
import { default as BizTables } from './biz-tables';
import { default as BizDetails } from './biz-details';
import { default as BizViews } from './biz-views';
import { default as BizCharts } from './biz-charts';

const parts = [
    BizPage,
    BizPageLayout,
    BizSearch,
    BizSearchSetup,
    BizHandler,
    BizTables,
    BizDetails,
    BizViews,
    BizCharts
];

const CommonComponents = {};

parts.forEach(component => CommonComponents[component.name] = component);

export { }

export default CommonComponents;