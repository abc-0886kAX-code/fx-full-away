/*
 * @FilePath: \fx-full-away\src\biz\User\entity\Identity.js
 * @Author: zhangyang
 * @Date: 2022-06-22 15:25:50
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-09-13 17:33:57
 * @Description:
 */
import { isBoolean, isNumber } from 'lodash';
import { cacheGet } from 'maggot-utils';

import {
    AllCityIdentitySymbolKey,
    UserIdentitySymbolKey,
    UserAreaSymbolKey,
} from '../share/context';

const IdentityType = {
    [AllCityIdentitySymbolKey]: '0',
};

const UserIdentity = {
    identity: IdentityType.AllCity,
    area: '',
};

function transformCacheKeyword(value, expect) {
    if (isBoolean(value) && !value) return expect;

    return value;
}

function transformIdentityToNumber(value) {
    if (isNumber(+value)) return +value;

    return 0;
}

export function getUserIdentity() {
    const identity = transformCacheKeyword(cacheGet(UserIdentitySymbolKey), UserIdentity.identity);

    const area = transformCacheKeyword(cacheGet(UserAreaSymbolKey), UserIdentity.area);

    const identityToNumber = () => transformIdentityToNumber(identity);

    return {
        identity,
        area,
        identityToNumber,
    };
}

export function getIdentityType(key = AllCityIdentitySymbolKey) {
    return IdentityType[key] ?? IdentityType[AllCityIdentitySymbolKey];
}
