<!--
 * @Author: zhangyang
 * @Date: 2021-05-11 16:23:57
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-07-06 10:14:39
 * @Description: file content
-->
<template>
    <div class="ytxd-not-page">
        <div class="ytxd-not-page-img">
            <img src="@/assets/images/other/page-404.png" alt="404" />
        </div>
        <p class="ytxd-not-page-text">没有找到您浏览的网页!</p>
        <div class="ytxd-not-page-button-group">
            <el-button type="primary" size="mini" plain @click="backHome"
                >返回首页</el-button
            >
            <el-button type="primary" size="mini" plain @click="backPrev"
                >返回上一页</el-button
            >
        </div>
    </div>
</template>

<script>
export default {
    name: "ytxd-not-page",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        backHome() {
            this.$router.push({ name: "home" });
        },
        backPrev() {
            this.$router.back();
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./404.scss";
</style>