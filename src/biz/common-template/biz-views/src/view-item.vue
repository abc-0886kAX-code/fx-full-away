<!--
 * @Author: zhangyang
 * @Date: 2021-06-15 11:11:05
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-15 13:54:59
 * @Description: file content
-->
<template>
    <div class="biz-view-item">
        <p class="biz-view-item-label" :style="itemStyle">{{ label }}：</p>
        <p class="biz-view-item-text">{{ text }}</p>
    </div>
</template>

<script>
import { default as BizViewMixins } from "../mixins/biz-view.mixins";
export default {
    name: "biz-view-item",
    mixins: [BizViewMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        text() {
            const { value } = this.scope;
            return value || "暂无数据";
        },
        itemStyle() {
            const width = this.itemWidth;

            return {
                width,
            };
        },
    },
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
.biz-view-item {
    display: flex;
    width: 100%;
    min-height: 32px;
    margin-bottom: 10px;
    overflow: hidden;
    & .biz-view-item-label,
    & .biz-view-item-text {
        font-size: 14px;
    }
    & .biz-view-item-label {
        color: #303133;
        line-height: 32px;
        padding-right: 10px;
        font-weight: bold;
        box-sizing: border-box;
    }
    & .biz-view-item-text {
        flex: 1;
        line-height: 32px;
        border-radius: 6px;
        padding: 0 5px;
        box-sizing: border-box;
    }
}
</style>