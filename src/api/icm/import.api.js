/*
 * @Author: zhangxin
 * @Date: 2022-07-01 13:43:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-13 13:41:45
 * @Description: 
 */
import { formData, send, setUrl } from '@/plugins/axios';
import { analysisResponse, formatPage, setupErrorTable } from "@/utils/business";

const messagePrompt = ({ code, msg }) => {
    if (code === 300 || code === 500) return { title: '异常', type: 'error', msg }

    if (code === 200) return { title: '成功', type: 'success', msg }
}

// 维护模板列表
export const icmImportTemplateData = ({ query, body }) => send({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    tag: "maintain",
    url: setUrl("/ICMModel/getICMTempList"),
    method: "POST",
    params: formatPage(query),
    data: formData(body)
}).catch(setupErrorTable);

// 维护模板信息
export const icmImportTemplateInfo = (params) => send({
    tag: "maintain",
    url: setUrl("/ICMModel/OperationICMTmp"),
    method: "POST",
    params
});

// 修改模板信息
export const icmImportTemplateEdit = (params) => icmImportTemplateInfo({ ...params, type: "update" });
// 新增模板信息
export const icmImportTemplateAdd = (params) => icmImportTemplateInfo({ ...params, type: "insert" });
// 删除模板信息
export const icmImportTemplateDelete = (params) => icmImportTemplateInfo({ ...params, type: "del" });

// 维护模板站点列表
export const icmImportTemplateSiteData = ({ query, body }, info) => send({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    tag: "maintain",
    url: setUrl("/ICMModel/getICMTmpSiteList"),
    method: "POST",
    params: Object.assign({}, formatPage(query), { tmpid: info.tmpid }),
    data: formData(body)
}).catch(setupErrorTable);

// 根据维护模板获取站点列表
export const icmTemplateBySiteList = (params) => send({
    tag: "maintain",
    url: setUrl("/ICMModel/getSiteList"),
    method: "POST",
    params
}).then(analysisResponse);
// 维护模板站点信息
export const icmImportTemplateSiteInfo = (params) => send({
    tag: "maintain",
    url: setUrl("/ICMModel/OpICMTmpSite"),
    method: "POST",
    params
});

// 修改模板站点信息
export const icmImportTemplateSiteEdit = (params) => icmImportTemplateSiteInfo({ ...params, type: "update" });
// 新增模板站点信息
export const icmImportTemplateSiteAdd = (params) => icmImportTemplateSiteInfo({ ...params, type: "insert" });
// 删除模板站点信息
export const icmImportTemplateSiteDelete = (params) => icmImportTemplateSiteInfo({ ...params, type: "del" });


// 获取模板信息
export const getTemplateInfo = (params) => send({
    tag: "maintain",
    url: setUrl("/ICMModel/getTempCsvdata"),
    method: "POST",
    params
}).then(analysisResponse);

// 导入降雨数据
export const importRainfallData = (params) => send({
    tag: "maintain",
    url: setUrl("/ICMModel/getICMTempData"),
    method: "POST",
    params
}).then(messagePrompt).catch(messagePrompt)
