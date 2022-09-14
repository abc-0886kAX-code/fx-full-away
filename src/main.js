/*
 * @Author: maggot-code
 * @Date: 2021-02-28 13:25:16
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-18 14:55:39
 * @Description: application main
 */
import '@/assets/icon/alifont/iconfont.css';
import '@/assets/style/app.scss';
import '@/assets/style/mars3d.scss';
import '@/assets/style/transition.scss';
import ChartsPagesLayout from '@/components/charts-pages-layout';
import Mars3DContainer from '@/biz/Mars3D/view/mars3d-container';
import ScreenGridContainer from '@/biz/ScrrenGrid/view/container';
import ScreenGridNode from '@/biz/ScrrenGrid/view/grid-node';
import ScreenGridSelect from '@/biz/ScrrenGrid/view/select';
import TreeLegend from '@/components/tree-legend';
import YtxdDialog from '@/components/dialog';
import YtxdEmpty from '@/components/empty';
import YtxdFloatWindow from '@/components/float-window';
import YtxdTabs from '@/components/tabs';
import Unknow from '@/pages/unknow';
import '@/plugins/element';
import '@/plugins/vxe-table';
import router from '@/router';
import store from '@/stroe';
import VueCompositionApi from '@vue/composition-api';
import MGform from 'maggot-form';
import MGtable from 'maggot-table';
import 'normalize.css';
import Vue from 'vue';
import App from './App.vue';

// 视频插件
import VideoPlayer from 'vue-video-player';
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(MGform);
Vue.use(MGtable);
Vue.use(ChartsPagesLayout);
Vue.use(Mars3DContainer);
Vue.use(TreeLegend);
Vue.use(YtxdDialog);
Vue.use(YtxdFloatWindow);
Vue.use(YtxdTabs);
Vue.use(YtxdEmpty);
Vue.use(Unknow);
Vue.use(ScreenGridContainer);
Vue.use(ScreenGridSelect);
Vue.use(ScreenGridNode);
Vue.use(VideoPlayer);

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
