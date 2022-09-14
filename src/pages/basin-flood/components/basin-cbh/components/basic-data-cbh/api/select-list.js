/*
 * @FilePath: \3D防汛作战\src\pages\basin-flood\components\basin-cbh\components\basic-data-cbh\api\select-list.js
 * @Author: zhangyang
 * @Date: 2022-06-22 13:39:43
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-22 14:00:17
 * @Description: 
 */
import FloodControlPlugIcon from "@/assets/icon/fanghong-dukou.png";

export default [
    {
        "key": "flood-control-plug",
        "label": "防洪堵口",
        "status": false,
        "legend": FloodControlPlugIcon,
        "children": []
    },
    {
        "key": "dike-danger-worker",
        "label": "堤防险工",
        "status": false,
        "legend": "#28AD00",
        "children": []
    },
    {
        "key": "river",
        "label": "河道",
        "status": false,
        "legend": "#0CFFFF",
        "children": []
    },
    {
        "key": "reservoir",
        "label": "水库",
        "status": false,
        "legend": "#45FFFF",
        "children": []
    },
    {
        "key": "gate-dam",
        "label": "闸坝",
        "status": false,
        "legend": "#00C5FF",
        "children": []
    },
    {
        "key": "land-use",
        "label": "土地利用",
        "status": false,
        "legend": "#fff",
        "children": []
    },
    {
        "key": "river-section",
        "label": "河道断面",
        "status": false,
        "legend": "#06E005",
        "children": []
    },
    {
        "key": "dem",
        "label": "DEM",
        "status": false,
        "legend": "#fff",
        "children": []
    }
];
