/*
 * @FilePath: \fx-full-away\src\biz\User\entity\Location.js
 * @Author: zhangyang
 * @Date: 2022-06-23 11:14:11
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-09-13 17:39:51
 * @Description:
 */
import { AllCityIdentitySymbolKey } from '../share/context';
import { AllCityLocation } from '../share/location';
import { getIdentityType } from './Identity';

const LocationGroup = {
    [getIdentityType(AllCityIdentitySymbolKey)]: AllCityLocation,
};

export function accordIdentityToLocation(Identity) {
    const { identity } = Identity;
    return LocationGroup[identity] ?? LocationGroup[getIdentityType(AllCityIdentitySymbolKey)];
}
