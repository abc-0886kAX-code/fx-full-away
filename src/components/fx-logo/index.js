/*
 * @Author: zhangyang
 * @Date: 2021-05-11 17:10:50
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-11 17:26:12
 * @Description: file content
 */
import FxLogo from './fx-logo.vue';

/* istanbul ignore next */
FxLogo.install = function (Vue) {
    Vue.component(FxLogo.name, FxLogo);
};

export default FxLogo;