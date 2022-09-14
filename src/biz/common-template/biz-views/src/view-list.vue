<!--
 * @Author: zhangyang
 * @Date: 2021-06-15 11:11:15
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-15 11:20:38
 * @Description: file content
-->
<template>
    <el-collapse-item class="biz-view-list" :title="`${label}：`" :name="field">
        <p v-if="fileEmpty">暂无文件</p>

        <ul v-else class="ytxd-file">
            <li class="ytxd-file-item" v-for="file in fileList" :key="file.id">
                <el-link type="primary" @click="showFile(file)">{{
                    file.name
                }}</el-link>
            </li>
        </ul>
    </el-collapse-item>
</template>

<script>
import { default as BizViewMixins } from "../mixins/biz-view.mixins";
export default {
    name: "biz-view-list",
    mixins: [BizViewMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        field() {
            const { field } = this.scope;
            return field;
        },
        fileList() {
            const { value } = this.scope;
            return value;
        },
        fileEmpty() {
            return this.fileList.length <= 0;
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        showFile(file) {
            console.log(file);
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
/deep/ .el-collapse-item__header {
    font-size: 14px;
    color: #303133;
    font-weight: bold;
}
</style>