/*
 * @Author: zhangyang
 * @Date: 2022-02-10 17:36:57
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-02-10 17:36:58
 * @Description: file content
 */
import BizPageLayout from './src/page-layout.vue';

/* istanbul ignore next */
BizPageLayout.install = function (Vue) {
    Vue.component(BizPageLayout.name, BizPageLayout);
};

export default BizPageLayout;