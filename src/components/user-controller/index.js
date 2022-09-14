/*
 * @Author: zhangyang
 * @Date: 2021-07-02 16:03:35
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-07-02 16:03:58
 * @Description: file content
 */
import UserController from './user-controller.vue';

/* istanbul ignore next */
UserController.install = function (Vue) {
    Vue.component(UserController.name, UserController);
};

export default UserController;