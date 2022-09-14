/*
 * @FilePath: \3D防汛作战\src\biz\User\usecase\useUserHomeModule.js
 * @Author: zhangyang
 * @Date: 2022-07-15 09:59:01
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-15 11:27:42
 * @Description: 
 */
import { provide, unref, computed } from "@vue/composition-api";
import { chunk } from "lodash";
import { getUserIdentity } from "../entity/Identity";
import { UserIdentityModules } from "../share/context";
import {
    ProgressBarCenter,
    ProgressBarLeft
} from "../share/modules";

export const filterPowerToModule = (identity) => (item) => {
    const mapping = item?.power ?? [];
    return mapping.includes(identity);
}

export const sortPowerToModule = (prev, next) => {
    const prevValue = prev?.sort ?? 0;
    const nextValue = next?.sort ?? 0;
    return prevValue - nextValue;
}

export function setupModulesPosition(index) {
    return index % 2 <= 0 ? "right" : "left";
}

export default function useUserHomeModule(moduleGather) {
    const Identity = getUserIdentity();
    const { identityToNumber } = Identity;
    const modules = computed(() => {
        const data = moduleGather
            .filter(filterPowerToModule(identityToNumber()))
            .sort(sortPowerToModule);
        return chunk(data, 3).reverse();
    });
    const moduleContainerNumber = computed(() => unref(modules).length);
    const progressBarClassName = computed(() => {
        const isCenter = unref(moduleContainerNumber) % 2 <= 0;
        return isCenter ?
            [ProgressBarCenter] :
            [ProgressBarLeft];
    });
    const moduleInfo = computed(() => {
        return {
            progressBarClassName: unref(progressBarClassName)
        }
    });

    provide(UserIdentityModules, {
        modules,
        moduleContainerNumber,
        moduleInfo
    });

    return {
        modules,
        moduleContainerNumber,
        moduleInfo,
        setupModulesPosition
    }
}
