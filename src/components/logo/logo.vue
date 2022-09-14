<!--
 * @Author: zhangyang
 * @Date: 2021-05-20 16:50:25
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-20 17:50:19
 * @Description: file content
-->
<template>
    <div class="ytxd-logo">
        <!-- <div class="logo-img">
            <img :src="url" alt="" />
        </div> -->

        <div class="meteorological">
            <weather></weather>
        </div>
        <!-- <div class="logo-text">
            <h1>{{ title }}</h1>
            <p>{{ subtitle }}</p>
        </div> -->
    </div>
</template>

<script>
import Weather from "@/components/weather";
export default {
    name: "ytxd-logo",
    mixins: [],
    components: { Weather },
    props: {
        url: {
            type: String,
            default: require("@/assets/images/logo/logoTitle.png"),
        },
        title: {
            type: String,
            default: () => "银通先达",
        },
        subtitle: {
            type: String,
            default: () => "YTXD",
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
@import "./logo.scss";
</style>