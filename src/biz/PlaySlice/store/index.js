/*
 * @Author: maggot-code
 * @Date: 2022-05-25 13:44:12
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-17 00:15:18
 * @Description: file content
 */
import { default as PlaySliceControl } from "./control.store";
import { default as PlaySliceData } from "./data.store";
import { default as PlaySliceList } from "./list.store";
import { default as PlaySliceScroll } from "./scroll.store";

export const state = {
    ...PlaySliceData,
    ...PlaySliceList,
    ...PlaySliceScroll,
    ...PlaySliceControl
};

export const getters = {
    active: (state) => state.indexes,
    oldActive: (state) => state.oldIndexes,
    prevActive: (_, getters) => {
        const index = getters.active - 1;
        const len = (getters.dataLength - 1);
        const min = len <= 0 ? 0 : len;
        return index < 0 ? min : index;
    },
    nextActive: (_, getters) => {
        const index = getters.active + 1;
        return index > getters.dataLength - 1 ? 0 : index;
    },
    activeNotEqual: (_, getters) => {
        return getters.active !== getters.oldActive;
    },
    datamap: (state) => state.datasource,
    dataLength: (_, getters) => getters.datamap.length,
    isVisabled: (_, getters) => {
        const hasName = getters.componentName.length > 0;
        return hasName || getters.dataLength > 0;
    },

    find: (_, getters) => getters.datamap[getters.active],
    findIndex: (_, getters) => (index) => getters.datamap[index],

    scrollPos: (state) => state.position,

    playLoading: (state) => state.loading,
    playState: (state) => state.playState,
    componentName: (state) => state.componentName,
    queryParams: (state) => state.params,
    notShowTime: (state) => state.notShowTime,
};

export const mutations = {
    setupActive(state, index) {
        const value = index > state.datasource.length - 1 ? 0 : index;
        state.oldIndexes = state.indexes;
        state.indexes = value;
    },
    setupDataSource(state, sources) {
        const { data, indexState } = sources;
        const index = indexState ? 0 : data.length - 1;

        state.position = 0;
        state.playState = false;
        state.datasource = data ?? [];
        state.indexes = index;
    },
    setupScrollPosition(state, value) {
        state.position = value ?? 0;
    },
    setupPlayLoad(state, status) {
        state.loading = status ?? true;
    },
    setupPlayState(state, status) {
        state.playState = status ?? false;
    },
    setupComponentName(state, name) {
        state.componentName = name ?? "";
    },
    setupQueryParams(state, params) {
        state.params = params ?? {};
    },
    setupNotShowTime(state, status) {
        state.notShowTime = status ?? false;
    }
};

export const actions = {
    _setupActive({ commit }, index) {
        commit('setupActive', index ?? 0);
    },
    _setupActiveAutoGrow({ commit, state }) {
        commit('setupActive', state.indexes + 1);
    },
    _setupDataSource({ commit }, sources) {
        commit('setupDataSource', sources);
    },
    _setupScrollPosition({ commit }, value) {
        commit('setupScrollPosition', value);
    },
    _setupPlayLoad({ commit }, status) {
        commit('setupPlayLoad', status);
    },
    _setupPlayState({ commit }, status) {
        commit('setupPlayState', status);
    },
    _setupComponentName({ commit }, name) {
        commit('setupComponentName', name);
    },
    _setupQueryParams({ commit }, params) {
        commit('setupQueryParams', params);
    },
    _setupNotShowTime({ commit }, status) {
        commit('setupNotShowTime', status);
    }
};
