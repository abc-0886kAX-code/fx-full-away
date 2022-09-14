<!--
 * @Author: zhangyang
 * @Date: 2022-02-11 14:06:34
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-06 16:47:40
 * @Description: file content
-->
<template>
    <mg-form class="biz-controller-search-setup" ref="searchSetup" :proName="proName" :job="jobFunction"
        :schema="searchFormSchema">
        <template #form-button v-if="renderButtonGroup">
            <el-button v-for="(cell, keys) in searchFormButtonGroup" plain :key="keys" :type="cell.type"
                :icon="cell.icon" @click="cell.handle">{{ cell.label }}</el-button>
        </template>
    </mg-form>
</template>

<script>
import { setSearchParams } from "@/biz/common-template/utils";
import { requestPrefix } from "@/config/axios.conf";

export default {
    name: "biz-controller-search-setup",
    mixins: [],
    components: {},
    props: {
        schema: {
            type: Array,
            default: () => [],
        },
        jobFunction: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        //这里存放数据
        return {
            searchFormButtonGroup: {
                search: {
                    type: "success",
                    icon: "el-icon-search",
                    label: "查询",
                    handle: this.search,
                },
                reset: {
                    type: "info",
                    icon: "el-icon-refresh",
                    label: "重置",
                    handle: this.reset,
                },
            },
            proName: requestPrefix,
        };
    },
    //监听属性 类似于data概念
    computed: {
        searchFormSchema() {
            return {
                formSchema: {
                    inline: true,
                    labelWidth: "0px",
                },
                cellSchema: this.schema,
            };
        },
        renderButtonGroup() {
            const status = this.schema.length > 0;

            return status;
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        search() {
            const { data } = this.getFormData();

            const searchParams = setSearchParams(data);

            this.$emit("sendSearch", searchParams);
        },
        reset() {
            this.$refs.searchSetup.resetForm();
        },
        /**
         * @description: 通过ref来获取指定表单内的所有数据集合与验证是否通过
         * @return {Object} checkFunc 是否通过验证, data 数据集合
         */
        getFormData() {
            const { validate = false, data = {} } =
                this.$refs.searchSetup && this.$refs.searchSetup.formOutput();
            return {
                checkFunc: validate,
                data: data,
            };
        },
    },
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
@import "~@/assets/style/biz-search.scss";
</style>
