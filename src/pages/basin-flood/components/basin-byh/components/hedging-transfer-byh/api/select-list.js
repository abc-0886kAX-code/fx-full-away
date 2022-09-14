/*
 * @Author: zhangxin
 * @Date: 2022-06-22 15:14:56
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-22 15:58:03
 * @Description: 按钮功能已禁用，等有了相关数据后可放开。"disabled": false,
 */

import Cangku from '@/assets/icon/cangku.png';
import Rescue from '@/assets/icon/rescue.png';
import Transfer from '@/assets/icon/transfer.png';
import WaterConservancy from '@/assets/icon/water-conservancy.png';

export default [
    {
        "key": "prevention-transfer",
        "label": "转移安置",
        "status": false,
        "legend": Transfer,
        "disabled": true,
        "children": []
    },
    {
        "key": "prevention-material",
        "label": "防汛物资",
        "status": false,
        "legend": Cangku,
        "disabled": true,
        "children": []
    },
    {
        "key": "prevention-ranks",
        "label": "抢险队伍",
        "status": false,
        "legend": "#F33662",
        "disabled": true,
        "children": [
            {
                "key": "rescue-ranks",
                "label": "防汛队伍",
                "status": false,
                "legend": Rescue,
                "disabled": true,
                "children": []
            },
            {
                "key": "water-conservancy-ranks",
                "label": "水利队伍",
                "status": false,
                "legend": WaterConservancy,
                "disabled": true,
                "children": []
            }
        ]
    }
]