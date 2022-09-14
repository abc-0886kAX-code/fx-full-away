/*
 * @Author: zhangxin
 * @Date: 2022-05-18 15:10:29
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-31 22:05:51
 * @Description: 
 */
import { send, setUrl, formData } from '@/plugins/axios';
import { analysisResponse } from "@/utils/business";

// 用户登录接口
export const login = ({ username, userpwd }) => send({
    url: setUrl('/login'),
    method: 'POST',
    // data: formData({ username, userpwd })
    params: { username, userpwd }
})

// 用户注销
export const logout = () => send({
    url: setUrl('/logout'),
    method: 'POST'
})

// 用户身份验证
export const loginCheck = () => send({
    url: setUrl('/loginCheck'),
    method: 'POST'
})

// 文件上传
export const fileUpload = (body) => send({
    url: setUrl('/File/UpFile'),
    method: 'POST',
    tag: "file",
    data: body
});

// 获取coedid列表和说明
export const codeidAndExplainGet = () => send({
    url: setUrl("/common/GetCodeCollect"),
    method: "POST",
    tag: "code",
});

// 根据codeid获取列表
export const codeListByCodeid = (codeid) => send({
    url: setUrl("/common/GetCodeItemByCodeid"),
    method: "POST",
    tag: "code",
    params: { codeid }
}).then(analysisResponse).catch(() => ([]));

// 获取ICM模板类型
export const icmTemplateTypeGet = () => codeListByCodeid("MX");

// 获取行政区类型
export const districtTypeGet = () => codeListByCodeid("AD");

// 获取水系类型
export const waterSystemTypeGet = () => codeListByCodeid("AE");

export const uploadFile = (data) => send({
    tag: "file",
    url: setUrl('/File/UpFile'),
    method: 'POST',
    data: formData(data),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
