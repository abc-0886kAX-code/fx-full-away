<!--
 * @Author: zhangyang
 * @Date: 2021-05-13 16:16:15
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-18 17:53:34
 * @Description: file content
-->
<template>
    <li class="ytxd-time-item" :class="activeClass" @click="switchActive">
        {{ context }}
    </li>
</template>

<script>
export default {
    name: "ytxd-time-item",
    mixins: [],
    components: {},
    props: {
        cell: Object,
        active: Number,
        index: Number,
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        context() {
            const { time } = this.cell;
            return time;
        },
        isActive() {
            return this.active === this.index;
        },
        activeClass() {
            return this.isActive ? "ytxd-time-item-active" : "";
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        switchActive() {
            this.$emit("switch", this.index);
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
.ytxd-time-item {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: #333;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
}
.ytxd-time-item-active {
    background-color: rgb(64, 158, 255);
    color: #fff;
}
.ytxd-time-item + .ytxd-time-item {
    margin-top: 20px;
}
</style>