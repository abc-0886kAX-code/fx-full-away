/*
 * @Author: zhangxin
 * @Date: 2022-06-30 10:20:59
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-30 11:32:03
 * @Description: 
 */
import HistoryPondingPoint from '@/assets/icon/history-ponding-point.png';
import SpongePondingPoint from '@/assets/icon/sponge-ponding-point.png';

export default [
    {
        "key": "ponding-point",
        "label": "积水点",
        "status": false,
        "legend": "#3498db",
        "children": [
            {
                "key": "sponge-ponding-point",
                "label": "海绵处积水点",
                "status": false,
                "legend": SpongePondingPoint,
                "children": []
            },
            {
                "key": "history-ponding-point",
                "label": "历史积水点",
                "status": false,
                "legend": HistoryPondingPoint,
                "children": []
            }
        ]
    }
];
