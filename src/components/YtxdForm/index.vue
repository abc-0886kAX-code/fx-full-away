<!--
 * @Author: zhangyang
 * @Date: 2020-11-09 10:37:12
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-02-22 16:11:49
 * @Description: 动态表单组件
-->
<template>
    <el-form
        class="ytxd-form"
        ref="ytxdFormData"
        :model="ytxdFormData"
        :label-width="labelWidth"
        :inline="inline"
    >
        <template v-if="ytxdFormSchema.length > 0">
            <el-form-item
                v-for="el in ytxdFormSchema"
                :key="el.unitFid"
                :label="el.label ? `${el.label}：` : ''"
                size="mini"
            >
                <component
                    v-if="YtxdFormComponents[el.name]"
                    :is="el.name"
                    :params="el.params"
                    :fieldName="el.fieldName"
                    :fieldValue.sync="ytxdFormData[el.fieldName]"
                    @onChange="onChanges"
                ></component>
            </el-form-item>
        </template>
        <slot></slot>

        <!-- <el-form-item v-if="ytxdFormSchema.length > 0">
            <el-button type="primary" @click="onSubmit" size="mini"
                >立即查询</el-button
            >
        </el-form-item> -->
    </el-form>
</template>

<script>
import formSchemaTest from "@/assets/js/ytxd-form-test-data.js";
import { YtxdFormComponents } from "./children";
import { typeToComponentName, setFormDefault } from "./utils";

export default {
    name: "ytxd-form",
    components: { ...YtxdFormComponents },
    props: {
        labelWidth: {
            type: String,
            default: () => "80px",
        },
        inline: {
            type: Boolean,
            default: () => false,
        },
        formSchema: {
            type: Array,
            default: () => formSchemaTest,
        },
        defSubmit: {
            type: Boolean,
            default: () => true,
        },
        driveSubmit: {
            type: Number,
            default: () => new Date().getTime(),
        },
        submitLock: {
            type: Boolean,
            default: () => true,
        },
    },
    data() {
        //这里存放数据
        return {
            YtxdFormComponents: YtxdFormComponents,
            ytxdFormSchema: [],
            ytxdFormData: {},
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {
        formSchema(newVal) {
            this.ytxdFormSchema = [];
            this.ytxdFormData = {};

            this.ytxdFormSchema = newVal.map((item) =>
                this.mergeComponentName(item)
            );
            newVal.forEach((item) => {
                Object.assign(this.ytxdFormData, this.importField(item));
            });
        },
        driveSubmit() {
            this.onSubmit();
        },
    },
    //方法集合
    methods: {
        // 合并components的name字段
        mergeComponentName(item) {
            return Object.assign({}, item, {
                name: typeToComponentName[item.type] || null,
            });
        },
        // 获取字段名称导入表单数据对象
        importField(item) {
            const defaultFunc = setFormDefault[item.type] || null;
            const field = {};
            field[item.fieldName] = defaultFunc(item);
            return field;
        },
        onChanges() {
            this.submitLock && this.onSubmit();
        },
        // 表单提交
        onSubmit() {
            this.$emit("onSelect", this.ytxdFormData);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.ytxdFormSchema = this.formSchema.map((item) =>
            this.mergeComponentName(item)
        );
        this.formSchema.forEach((item) => {
            Object.assign(this.ytxdFormData, this.importField(item));
        });
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$nextTick(() => {
            this.defSubmit && this.onSubmit();
        });
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
.ytxd-form {
    width: 100%;
}
</style>