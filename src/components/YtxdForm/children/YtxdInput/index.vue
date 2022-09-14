<!--
 * @Author: zhangyang
 * @Date: 2020-11-09 10:47:36
 * @LastEditors: zhangyang
 * @LastEditTime: 2020-11-10 09:27:43
 * @Description: 动态表单 - 输入框组件
-->
<template>
    <el-input
        class="ytxd-form-input"
        v-model="inputValue"
        clearable
        :placeholder="placeholder"
        :disabled="disabled"
        @change="changeValue"
    ></el-input>
</template>

<script>
import YtxdFormMixins from "../ytxd-form-mixins";
export default {
    name: "ytxd-form-input",
    components: {},
    mixins: [YtxdFormMixins],
    data() {
        //这里存放数据
        return {
            placeholder: this.params.placeholder || "请输入内容",
            disabled: false,
            inputValue: this.fieldValue || "",
        };
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
@import "./index.scss";
</style>