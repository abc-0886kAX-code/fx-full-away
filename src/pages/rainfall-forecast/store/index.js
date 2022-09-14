/*
 * @Author: zhangxin
 * @Date: 2022-06-08 16:45:52
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-20 10:48:31
 * @Description: 
 */
export const state = {
    legendPredictionData: {},
    active: false,
}

export const getters = {
    getLegendPredictionData: (state) => state.legendPredictionData,
    isActive: (state) => state.active,
}

export const mutations = {
    setupLegendPredictionData(state, sources) {
        state.legendPredictionData = sources ?? {};
    },
    setupAcitve(state, status) {
        state.active = status
    }
}

export const actions = {
    _setupLegendPredictionData({ commit }, sources) {
        commit('setupLegendPredictionData', sources)
    },
    _setupAcitve({ commit }, status) {
        commit('setupAcitve', status)
    }
}
