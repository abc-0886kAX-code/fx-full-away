/*
 * @FilePath: \fx-full-away\src\biz\User\share\layers.js
 * @Author: zhangyang
 * @Date: 2022-06-22 15:22:23
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-09-13 18:13:34
 * @Description:
 */
import {
    BJ_PG_BOUNDARY_SERVICE,
    BYH_BOUNDARY_SERVICE,
    CBH_BOUNDARY_SERVICE,
    DQH_BOUNDARY_SERVICE,
    JYH_BOUNDARY_SERVICE,
    YDH_BOUNDARY_SERVICE,
} from '@/config/arcgis.conf';
import {
    BeiyunBasinSymbolKey,
    ChaobaiBasinSymbolKey,
    DaqingBasinSymbolKey,
    HomeBoundarySymbolKey,
    JiyunBasinSymbolKey,
    YongdingBasinSymbolKey,
} from '../share/context';

// 全市用户身份
export const AllCityLayers = {
    [HomeBoundarySymbolKey]: BJ_PG_BOUNDARY_SERVICE,
    [ChaobaiBasinSymbolKey]: CBH_BOUNDARY_SERVICE,
    [JiyunBasinSymbolKey]: JYH_BOUNDARY_SERVICE,
    [BeiyunBasinSymbolKey]: BYH_BOUNDARY_SERVICE,
    [YongdingBasinSymbolKey]: YDH_BOUNDARY_SERVICE,
    [DaqingBasinSymbolKey]: DQH_BOUNDARY_SERVICE,
};
