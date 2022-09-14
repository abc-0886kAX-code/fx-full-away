<!--
 * @Author: zhangxin
 * @Date: 2022-05-18 13:11:17
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-18 15:15:20
 * @Description: 
-->
<template>
    <transition name="el-fade-in-linear">
        <router-view></router-view>
    </transition>
</template>

<script>
import { loginCheck } from "@/api/common.api";
export default {
    name: "ytxd-main-layout",
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        loginCheck();
    },
};
</script>