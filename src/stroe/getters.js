/*
 * @Author: zhangyang
 * @Date: 2021-05-11 16:16:35
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-11 16:17:31
 * @Description: file content
 */
const getters = {
    token: state => state.user.token,
    truename: state => state.user.truename,
    roletype: state => state.user.roletype,
    roles: state => state.user.roles,
    hasRoles: state => state.permission.hasRoles,
    routes: state => state.permission.routes,
}
export default getters