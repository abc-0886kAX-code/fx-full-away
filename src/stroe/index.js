/*
 * @Author: zhangyang
 * @Date: 2021-05-11 16:16:20
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 13:38:04
 * @Description: file content
 */
import * as playSliceStore from '@/biz/PlaySlice/store';
import * as cbhICMModelPredictionStore from '@/pages/basin-flood/components/basin-cbh/components/watershed-forecast-cbh/stroe';
import * as rainfallForecastStore from '@/pages/rainfall-forecast/store';
import Vue from 'vue';
import Vuex from 'vuex';
import * as axiosStore from './axios';
import * as basinStore from './basin';
import getters from './getters';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ...basinStore.state,
        ...axiosStore.state,
        ...playSliceStore.state,
        ...rainfallForecastStore.state,
        ...cbhICMModelPredictionStore.state,
    },
    getters: {
        ...basinStore.getters,
        ...axiosStore.getters,
        ...playSliceStore.getters,
        ...rainfallForecastStore.getters,
        ...cbhICMModelPredictionStore.getters,
        ...getters
    },
    mutations: {
        ...basinStore.mutations,
        ...axiosStore.mutations,
        ...playSliceStore.mutations,
        ...rainfallForecastStore.mutations,
        ...cbhICMModelPredictionStore.mutations,
    },
    actions: {
        ...basinStore.actions,
        ...axiosStore.actions,
        ...playSliceStore.actions,
        ...rainfallForecastStore.actions,
        ...cbhICMModelPredictionStore.actions,
    },
    modules: { ...modules },
});
