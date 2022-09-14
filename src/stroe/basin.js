/*
 * @FilePath: \3D防汛作战\src\stroe\basin.js
 * @Author: zhangyang
 * @Date: 2022-07-12 13:22:51
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-12 13:56:58
 * @Description: 
 */
import { isString, isNumber } from "lodash";
import { shortCacheGet, shortCacheSet } from "maggot-utils";

const isEmptyString = (str) => isString(str) && str.trim().length === 0;

export const state = {
    basinCodeKey: "basinCacheCode",
    basinPortKey: "basinCachePort",
    code: "",
    port: "",
}

export const getters = {
    basinCode: state => {
        if (isEmptyString(state.code)) {
            const code = shortCacheGet(state.basinCodeKey);
            state.code = code ? code : "";
            return state.code;
        }

        return state.code;
    },
    basinPort: state => {
        if (isEmptyString(state.port)) {
            const port = shortCacheGet(state.basinPortKey);
            state.port = port ? port : "";
            return state.port;
        }

        return state.code;
    },
    basinPortPath: (_, getters) => {
        const hasDock = (
            isNumber(getters.basinPort) ||
            (isString(getters.basinPort) && getters.basinPort.length > 0)
        )
        if (hasDock) return `/${getters.basinPort}`;

        return "";
    },
    basinCache: (_, getters) => ({
        code: getters.basinCode,
        port: getters.basinPort,
        portPath: getters.basinPortPath
    }),
}

export const mutations = {
    setBasinCode(state, basinCode) {
        state.code = basinCode ?? "";
        shortCacheSet(state.basinCodeKey, state.code);
    },
    setBasinPort(state, basinPort) {
        state.port = basinPort ?? "";
        shortCacheSet(state.basinPortKey, state.port);
    },
}

export const actions = {
    _setBasinCache({ commit }, cache = {}) {
        commit('setBasinCode', cache.code);
        commit('setBasinPort', cache.toport);
    }
}
