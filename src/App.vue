<!--
 * @Author: maggot-code
 * @Date: 2021-02-28 13:25:16
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-05 13:55:07
 * @Description: application App home pages
-->
<template>
    <div id="app">
        <main-layout></main-layout>
    </div>
</template>

<script>
import MainLayout from "@/pages/layout/main-layout";
export default {
    name: "App",
    components: { MainLayout },
    data() {
        return {};
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
};
</script>