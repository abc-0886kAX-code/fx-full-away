/*
 * @Author: zhangyang
 * @Date: 2022-06-07 10:40:16
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-07 10:43:51
 * @Description: file content
 */
export function setupDefault(defaultData) {
    return (data) => Object.assign({}, defaultData, data ?? {});
}