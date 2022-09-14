/*
 * @Author: zhangyang
 * @Date: 2022-04-12 15:36:14
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-12 15:36:14
 * @Description: file content
 */
import DyeingFont from './dyeing-font.vue';

/* istanbul ignore next */
DyeingFont.install = function (Vue) {
    Vue.component(DyeingFont.name, DyeingFont);
};

export default DyeingFont;