/*
 * @Author: zhangxin
 * @Date: 2022-07-13 10:49:44
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-13 10:59:20
 * @Description: 
 */
export const state = {
    modelSimid: null
};

export const getters = {
    getModelSimid: state => state.modelSimid
};

export const mutations = {
    setupModelSimid(state, id) {
        state.modelSimid = id;
    }
};

export const actions = {
    _setupModelSimid({ commit }, id) {
        commit("setupModelSimid", id);
    }
};
