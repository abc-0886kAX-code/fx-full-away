/*
 * @Author: zhangxin
 * @Date: 2022-07-12 11:28:56
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-13 09:31:53
 * @Description: 
 */
export default {
    templateName: [
        { required: true, message: '请输入模板名称', trigger: 'blur' }
    ],
    importoptions: [
        { required: true, message: '请选择模板类型', trigger: 'change' }
    ],
    timeValue: [
        { required: true, message: '请选择日期范围', trigger: ['blur', 'change'] }
    ],
}