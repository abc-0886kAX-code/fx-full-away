/*
 * @Author: abc088_6kAX_code 86451477+abc-0886kAX-code@users.noreply.github.com
 * @Date: 2022-07-12 11:28:53
 * @LastEditors: abc088_6kAX_code 86451477+abc-0886kAX-code@users.noreply.github.com
 * @LastEditTime: 2022-07-29 18:00:36
 * @FilePath: \防汛大屏\src\pages\basin-flood\components\basin-jyh\components\basic-data-jyh\api\select-list.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import FloodControlPlugIcon from "@/assets/icon/fanghong-dukou.png";

export default [
    // {
    //     "key": "flood-control-plug",
    //     "label": "防洪堵口",
    //     "status": false,
    //     "legend": FloodControlPlugIcon,
    //     "children": []
    // },
    // {
    //     "key": "dike-danger-worker",
    //     "label": "堤防险工",
    //     "status": false,
    //     "legend": "#28AD00",
    //     "children": []
    // },
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
        "key": "river-section",
        "label": "河道断面",
        "status": false,
        "legend": "#fff",
        "children": []
    }
];
