/*
 * @Author: zhangxin
 * @Date: 2022-07-18 16:21:56
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-18 16:53:28
 * @Description: 
 */
import setupConfigDev from './config.dev';
import setupConfigPro from './config.pro';

const isDEV = process.env.NODE_ENV === "development";

export default (mode = 3) => {
    return isDEV ? setupConfigDev(mode) : setupConfigPro(mode);
}