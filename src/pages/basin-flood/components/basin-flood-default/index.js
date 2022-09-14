/*
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:44
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-19 16:58:34
 * @Description: 
 */
import BasinFloodDefault from './basin-flood-default.vue';

BasinFloodDefault.install = function (Vue) {
    Vue.component(BasinFloodDefault.name, BasinFloodDefault);
};

export default BasinFloodDefault;