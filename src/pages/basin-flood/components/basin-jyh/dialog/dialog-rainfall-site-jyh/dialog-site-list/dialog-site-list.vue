<!--
 * @Author: zhangyang
 * @Date: 2021-07-01 14:54:16
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-20 17:35:49
 * @Description: file content
-->
<template>
    <div class="dialog-site-list">
        <div class="dialog-site-list-body">
            <div
                class="dialog-site-list-body-item"
                v-for="(item, index) in SiteWeightList"
                :key="index"
            >
                <span>{{ item.stnm }}</span>
                <el-input
                    v-model="item.weight"
                    placeholder="请输入权重数值"
                ></el-input>
            </div>
        </div>

        <el-button
            class="dialog-site-list-btn"
            type="primary"
            @click="calculate"
            >计算</el-button
        >
    </div>
</template>

<script>
import { getSiteWeightList } from "@/pages/basin-flood/components/basin-cbh/api";
import { default as DialogContent } from "@/mixins/dialog-content.mixins";
export default {
    name: "dialog-site-list",
    mixins: [DialogContent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            SiteWeightList: [],
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        calculate() {
            this.$emit("collectData", JSON.stringify(this.SiteWeightList));
            this.$emit("closeDialog");
        },
        executiveRequest() {
            this.$emit("loadStart");
            getSiteWeightList({ tp: this.info.type })
                .then((res) => {
                    if (res <= 0) return;

                    this.SiteWeightList = res;

                    this.$emit("loadEnd");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.executiveRequest();
    },
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
@import "./dialog-site-list.scss";
.dialog-site-list {
    height: 100%;
    width: 98%;
    overflow-x: hidden;
    overflow-y: auto;
    white-space: pre-wrap;
    color: #fff;
    margin: 0 auto;
}
</style>