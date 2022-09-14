/*
 * @Author: zhangxin
 * @Date: 2022-04-27 13:17:05
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-27 13:27:09
 * @Description: 
 */
import { shallowRef } from "@vue/composition-api";

export function Uischema(sources = {}) {
    const uiSchema = shallowRef(sources);

    const setupUiSchema = (sources = {}) => uiSchema.value = sources;

    return {
        uiSchema,
        setupUiSchema
    }
}