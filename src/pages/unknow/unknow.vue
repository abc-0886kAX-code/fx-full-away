<!--
 * @Author: zhangyang
 * @Date: 2022-04-12 10:11:29
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-12 10:12:37
 * @Description: file content
-->
<template>
    <div class='unknow'>
        <h1>{{ keyword }}</h1>
    </div>
</template>

<script>
export default {
    name: 'unknow',
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        keyword() {
            return this.$route.meta.title;
        }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./unknow.scss";
</style>