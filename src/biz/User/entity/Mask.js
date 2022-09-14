/*
 * @FilePath: \fx-full-away\src\biz\User\entity\Mask.js
 * @Author: zhangyang
 * @Date: 2022-06-22 15:24:44
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-09-14 14:01:38
 * @Description:
 */
const UserMaskURI = '/mask/areas';

export function setupMaskUrl(Identity) {
    const { area } = Identity;
    return `${UserMaskURI}/${area}.json`;
}

export function setupMaskOpacity() {
    return process.env.NODE_ENV === 'production' ? 1.0 : 1.0;
}
