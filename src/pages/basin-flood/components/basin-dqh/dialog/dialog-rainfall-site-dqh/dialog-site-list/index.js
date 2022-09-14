/*
 * @Author: zhangxin
 * @Date: 2022-05-17 18:53:23
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-20 17:17:25
 * @Description: 
 */
import DialogSiteList from './dialog-site-list.vue';

/* istanbul ignore next */
DialogSiteList.install = function (Vue) {
    Vue.component(DialogSiteList.name, DialogSiteList);
};

export default DialogSiteList;