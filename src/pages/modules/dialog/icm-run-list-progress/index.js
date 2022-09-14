/*
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-progress-query\index.js
 * @Author: zhangyang
 * @Date: 2022-06-30 16:02:33
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-01 15:47:03
 * @Description: 
 */
import IcmRunListProgress from './icm-run-list-progress.vue';

/* istanbul ignore next */
IcmRunListProgress.install = function (Vue) {
    Vue.component(IcmRunListProgress.name, IcmRunListProgress);
};

// export * from "./usecase/useProgress";
// export * from "./usecase/useStatus";
// export * from "./usecase/useSubStatus";
// export * from "./usecase/usePath";

export default IcmRunListProgress;
