/*
 * @FilePath: \fx-full-away\src\biz\User\entity\Lyaer.js
 * @Author: zhangyang
 * @Date: 2022-06-22 15:23:20
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-09-13 17:58:01
 * @Description:
 */
import { isNil } from 'lodash';
import {
    AllCityIdentitySymbolKey,
    BasinModuleSymbolKey,
    BeiyunBasinSymbolKey,
    ChaobaiBasinSymbolKey,
    DaqingBasinSymbolKey,
    HomeBoundarySymbolKey,
    JiyunBasinSymbolKey,
    MapContainerModuleSymbolKey,
    YongdingBasinSymbolKey,
} from '../share/context';
import { AllCityLayers } from '../share/layers';
import { getIdentityType } from './Identity';

const LayerGroup = {
    [getIdentityType(AllCityIdentitySymbolKey)]: AllCityLayers,
};

// 根据不同模块拆分不同图层组
export function accordModuleSplitLayerGroup(Identity) {
    const layerGroup = accordIdentityToLayerGroup(Identity);

    return {
        [MapContainerModuleSymbolKey]: setupMapContainerLayers(layerGroup),
        [BasinModuleSymbolKey]: setupBasinLayers(layerGroup),
    };
}

// 过滤出地图容器需要使用的图层
export function setupMapContainerLayers(layers) {
    return selectContainLayers(layers, [HomeBoundarySymbolKey]);
}

// 过滤出流域需要使用的图层
export function setupBasinLayers(layers) {
    return selectContainLayers(layers, [
        ChaobaiBasinSymbolKey,
        JiyunBasinSymbolKey,
        BeiyunBasinSymbolKey,
        YongdingBasinSymbolKey,
        DaqingBasinSymbolKey,
    ]);
}

// 选取图层
export function selectContainLayers(layers, contain = []) {
    const data = {};

    for (const key in layers) {
        if (contain.includes(key)) data[key] = layers[key];
    }

    return data;
}

// 根据身份获取可用图层组
export function accordIdentityToLayerGroup(Identity) {
    const { identity } = Identity;
    return LayerGroup[identity] ?? LayerGroup[getIdentityType(AllCityIdentitySymbolKey)];
}

// 根据图层组主键获取对应图层组数据
export function accordKeywordToGroupData(group, moduleKey, key) {
    if (isNil(group[moduleKey]) || isNil(group[moduleKey][key])) return {};

    return group[moduleKey][key];
}

export function findLayerService(group, moduleKey) {
    return key => accordKeywordToGroupData(group, moduleKey, key);
}
