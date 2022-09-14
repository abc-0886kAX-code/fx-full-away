<!--
 * @Author: zhangyang
 * @Date: 2021-06-10 11:12:56
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-11 13:14:48
 * @Description: file content
-->
<template>
    <el-button-group class="biz-controller-handler">
        <el-button
            v-for="(item, key) in allController"
            :key="key"
            size="mini"
            :type="item.type"
            :icon="item.icon"
            :loading="item.loading"
            @click="triggerEvent(item)"
            >{{ item.label }}</el-button
        >
    </el-button-group>
</template>

<script>
import { setHandler } from "@/biz/common-template/utils";

export default {
    name: "biz-controller-handler",
    mixins: [],
    components: {},
    props: {
        handleEvent: {
            type: Array,
            default: () => [],
        },
        baseEvent: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        allController() {
            return setHandler(this.handleEvent, this.baseEvent);
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        triggerEvent(itemEvent) {
            this.$emit("triggerEvent", itemEvent);
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
@import "~@/assets/style/biz-handler.scss";
</style>