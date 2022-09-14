/*
 * @Author: maggot-code
 * @Date: 2022-05-25 13:30:21
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-05-25 13:30:46
 * @Description: file content
 */
import PlaySliceList from './play-slice-list.vue';

/* istanbul ignore next */
PlaySliceList.install = function (Vue) {
    Vue.component(PlaySliceList.name, PlaySliceList);
};

export default PlaySliceList;