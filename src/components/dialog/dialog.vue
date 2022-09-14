<!--
 * @Author: zhangyang
 * @Date: 2021-05-13 10:28:16
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-20 13:56:15
 * @Description: file content
-->
<template>
    <el-dialog
        v-drag
        ref="dialog"
        class="ytxd-dialog"
        v-bind="options"
        :visible.sync="isShow"
    >
        <template v-slot:title>
            <div class="ytxd-dialog-header">
                <h3 class="popup-handle">{{ options.title }}</h3>
                <div class="ytxd-dialog-control">
                    <i class="el-icon-close" @click="onClose"></i>
                </div>
            </div>
        </template>

        <div
            class="ytxd-dialog-main"
            v-loading="loading"
            :key="dialogKey"
            :style="{ height: mainHeight }"
        >
            <slot>
                <ytxd-empty></ytxd-empty>
            </slot>
        </div>
    </el-dialog>
</template>

<script>
import { flake } from "maggot-utils";
import { isNil, isString, isBoolean } from "lodash";
import Drag from "./drag";
import YtxdEmpty from "@/components/empty";

const DialogOptions = {
    modal: true,
    width: "900px",
    title: "银通先达",
    center: "center",
    "show-close": false,
    "lock-scroll": true,
    "append-to-body": true,
    "destroy-on-close": false,
    "modal-append-to-body": true,
    "close-on-press-escape": true,
    "close-on-click-modal": false,
};

export default {
    name: "ytxd-dialog",
    directives: { Drag },
    mixins: [],
    components: { YtxdEmpty },
    props: {
        visable: {
            type: Boolean,
            default: () => false,
        },
        loading: {
            type: Boolean,
            default: () => false,
        },
        height: {
            type: [Number, String],
            default: () => "300px",
        },
    },
    data() {
        //这里存放数据
        return {
            dialogKey: flake.gen(),
            isShow: this.visable,
        };
    },
    //监听属性 类似于data概念
    computed: {
        options() {
            const { modal, width, title } = this.$attrs;

            if (!isNil(modal) && isBoolean(modal)) {
                DialogOptions.modal = modal;
            }

            if (!isNil(width) && isString(width)) {
                DialogOptions.width = width;
            }

            if (!isNil(title) && isString(title)) {
                DialogOptions.title = title;
            }

            return DialogOptions;
        },
        mainHeight() {
            if (isString(this.height)) {
                return this.height;
            }

            return `${this.height}px`;
        },
    },
    //监控data中的数据变化
    watch: {
        visable(newVal) {
            if (newVal) {
                this.dialogKey = flake.gen();
                this.$emit("update:loading", true);
            }

            this.isShow = newVal;
        },
        isShow(newVal) {
            this.$emit("update:visable", newVal);
        },
    },
    //方法集合
    methods: {
        onClose() {
            this.isShow = false;
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
@import "./dialog.scss";
</style>