<!--
 * @Author: zhangyang
 * @Date: 2020-11-09 10:47:36
 * @LastEditors: zhangyang
 * @LastEditTime: 2020-11-19 15:28:15
 * @Description: file content
-->
<template>
    <el-date-picker
        class="ytxd-form-date"
        v-model="dateValue"
        :type="type"
        :clearable="false"
        :editable="false"
        :placeholder="placeholder"
        :value-format="format"
        :format="format"
        @change="changeValue"
    >
    </el-date-picker>
</template>

<script>
import YtxdFormMixins from "../ytxd-form-mixins";
export default {
    name: "ytxd-form-date",
    components: {},
    mixins: [YtxdFormMixins],
    data() {
        //这里存放数据
        return {
            dateValue: this.fieldValue || "",
            type: this.params.type || "datetime",
            placeholder: this.params.placeholder || "请选择日期",
            format: this.params.format || "yyyy-MM-dd HH:mm:ss",
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