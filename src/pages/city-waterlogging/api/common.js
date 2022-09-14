
import { send, setUrl } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";

// 城市内涝默认表格数据
export const getDefaultTableData = () => send({
    url: setUrl('/SW/SSJC/getCSNLList'),
    method: 'GET',
}).then(analysisResponse)