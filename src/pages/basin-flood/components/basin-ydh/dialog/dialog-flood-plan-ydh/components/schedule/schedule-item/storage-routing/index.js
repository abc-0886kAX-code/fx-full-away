/*
 * @Author: zhangxin
 * @Date: 2022-04-14 11:19:13
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-14 14:27:56
 * @Description: 
 */

import StorageRouting from './storage-routing.vue';

/* istanbul ignore next */
StorageRouting.install = function (Vue) {
    Vue.component(StorageRouting.name, StorageRouting);
};

export default StorageRouting;


