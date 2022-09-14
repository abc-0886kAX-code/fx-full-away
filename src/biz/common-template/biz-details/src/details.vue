<!--
 * @Author: zhangyang
 * @Date: 2021-06-10 11:12:25
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-06 16:47:00
 * @Description: file content
-->
<template>
    <mg-form class="biz-controller-details" ref="mgForm" :proName="proName" :schema="detailsFormSchema" :job="job"
        @form-error="handlerFormError" @monitor-value="monitorValue"></mg-form>
</template>

<script>
import { default as Notify } from "@/plugins/element";
import { requestPrefix } from "@/config/axios.conf";

const { notifyE } = Notify;

export default {
    name: "biz-controller-details",
    mixins: [],
    components: {},
    props: {
        schema: {
            type: Array,
            default: () => [],
        },
        job: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        //这里存放数据
        return {
            proName: requestPrefix,
        };
    },
    //监听属性 类似于data概念
    computed: {
        detailsFormSchema() {
            return {
                formSchema: { labelWidth: "150px", labelPosition: "left" },
                cellSchema: this.schema,
            };
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handlerFormError(errorInfo) {
            const { txt } = errorInfo.error;

            notifyE(txt);
        },
        monitorValue(value) { },
        /**
         * @description: 通过ref来获取指定表单内的所有数据集合与验证是否通过
         * @return {Object} checkFunc 是否通过验证, data 数据集合
         */
        getFormData() {
            const { validate = false, data = {} } =
                this.$refs.mgForm && this.$refs.mgForm.formOutput();
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
@import "~@/assets/style/biz-details.scss";
</style>
