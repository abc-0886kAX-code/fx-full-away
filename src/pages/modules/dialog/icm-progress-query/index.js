/*
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-progress-query\index.js
 * @Author: zhangyang
 * @Date: 2022-06-30 16:02:33
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-01 15:47:03
 * @Description: 
 */
import IcmProgressQuery from './icm-progress-query.vue';

/* istanbul ignore next */
IcmProgressQuery.install = function (Vue) {
    Vue.component(IcmProgressQuery.name, IcmProgressQuery);
};

export * from "./usecase/useProgress";
export * from "./usecase/useStatus";
export * from "./usecase/useSubStatus";
export * from "./usecase/usePath";

export default IcmProgressQuery;
