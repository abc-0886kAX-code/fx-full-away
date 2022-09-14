/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\shared\tab.js
 * @Author: zhangyang
 * @Date: 2022-08-03 13:33:23
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 14:04:55
 * @Description: 
 */
import {
    AllCityKeyName,
    PingGuKeyName,
} from "./key";

import { default as BasicData } from "../biz/BasicData";
import { default as FloodForecast } from "../biz/FloodForecast";
import { default as FloodWarn } from "../biz/FloodWarn";
import { default as TransferWarn } from "../biz/TransferWarn";

export const TabComponent = {
    [BasicData.name]: BasicData,
    [FloodForecast.name]: FloodForecast,
    [FloodWarn.name]: FloodWarn,
    [TransferWarn.name]: TransferWarn
};

export default {
    [AllCityKeyName]: TabComponent,
    [PingGuKeyName]: TabComponent,
};
