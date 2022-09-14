<!--
 * @Author: zhangyang
 * @Date: 2021-05-26 13:08:31
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-04 14:33:33
 * @Description: file content
-->
<template>
    <el-tabs
        class="ytxd-tabs"
        :type="tabsType"
        v-model="tabActive"
        :tab-position="tabPosition"
        @tab-click="getTabRow(tabActive)"
        :before-leave="beforeLeave"
    >
        <el-tab-pane v-for="(cell, keys) in tabsMap" :key="keys" :name="keys">
            <span slot="label" :class="cell.styleName">
                <i class="ticon"></i>
                {{ cell.label }}
            </span>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import TabsMixins from "@/mixins/tabs.mixins";
export default {
    name: "ytxd-tabs",
    mixins: [TabsMixins],
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
@import "./tabs";
</style>