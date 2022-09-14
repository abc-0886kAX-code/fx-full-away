<!--
 * @Author: zhangyang
 * @Date: 2021-05-11 16:27:35
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-19 15:49:57
 * @Description: file content
-->
<template>
    <div class="ytxd-layout ytxd-nav-layout">
        <el-container class="ytxd-content">
            <!-- 视频背景 -->
                <video id="v1" autoplay loop muted>
                    <source
                        src="../../../../public/mp4/header-video.mp4"
                        type="video/mp4"
                    />
                </video>
            <el-header class="ytxd-header" :class="headerClass">
                
                <slot name="logo"></slot>
                <!-- <slot name="nav"></slot> -->
                <!-- <slot name="fx-logo"></slot> -->
                <slot name="control"></slot>
            </el-header>

            <el-container class="ytxd-main">
                <el-main class="ytxd-main-content">
                    <transition name="el-fade-in-linear">
                        <router-view />
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "ytxd-nav-layout",
    mixins: [],
    components: {},
    props: {
        headerClass: {
            type: String,
            default: () => "",
        },
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
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
@import "./nav-layout";
</style>