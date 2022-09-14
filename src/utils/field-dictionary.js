/*
 * @Author: zhangyang
 * @Date: 2021-05-27 13:51:26
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-27 17:04:48
 * @Description: file content
 */
import { isNil } from 'lodash';

const dictionary = {
    stcd: "水文站编号",
    stnm: "名称",
    areacode: "行政区域编号",
    basincode: "流域编号",
    lgtd: "经度",
    lttd: "纬度",
    address: "地址",
    flz: "汛限值",
    iswarning: "是否为洪水预警站",
    angle: "角度",
    minvalue: "最大值",
    maxvalue: "最小值",
    rkel: "河底高程",
    dkel: "河堤高程",
    m20: "20年一遇",
    m50: "50年一遇",
    basin: "流域",
    lth: "长度",
}

export default function matchingField(baseData) {
    const data = [];

    for (const key in baseData) {
        const lable = dictionary[key];

        if (!isNil(lable)) {
            data.push({
                lable,
                textword: baseData[key]
            })
        }
    }

    return data;
}