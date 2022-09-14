/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\api\common.js
 * @Author: zhangyang
 * @Date: 2022-07-30 16:15:31
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-31 20:46:55
 * @Description: 
 */
import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";

// 平谷区山洪防御默认表格数据
export const getPGDefaultTableData = () => send({
    url: setUrl('/SW/MFDC/getMFDCList'),
    method: 'GET',
}).then(analysisResponse).then((data) => data.map((item) => {
    const { waring } = item;
    const waringLabel = waring === '1' ? "报警" : "未报警"
    return { ...item, waringLabel }
}));
