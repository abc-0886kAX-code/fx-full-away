<!--
 * @Author: zhangyang
 * @Date: 2021-06-10 11:13:22
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-02-10 17:49:52
 * @Description: file content
-->
<template>
    <div class="biz-controller-page" v-if="load">
        <section class="controller-area" v-if="useController">
            <main class="search-main">
                <slot name="search"></slot>
            </main>

            <main class="handler-main">
                <slot name="handler"></slot>
            </main>
        </section>

        <section class="body-area" :style="bodyAreaStyle">
            <main class="tables-main" ref="tablesMain">
                <template v-if="hasRenderTable">
                    <!-- <slot name="tables"></slot> -->
                    <slot
                        name="tables"
                        :tables="{ height: tableMainHeight }"
                    ></slot>
                </template>
            </main>
        </section>

        <ytxd-dialog
            :visable.sync="dialogVisable"
            :loading.sync="dialogLoading"
            :title="title"
            width="70%"
            height="630px"
        >
            <slot name="dialog">
                <ytxd-empty></ytxd-empty>
            </slot>
        </ytxd-dialog>
    </div>

    <ytxd-empty v-else></ytxd-empty>
</template>

<script>
import YtxdEmpty from "@/components/empty";
import YtxdDialog from "@/components/dialog";
export default {
    name: "biz-controller-page",
    mixins: [],
    components: {
        YtxdEmpty,
        YtxdDialog,
    },
    props: {
        load: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "水文自动化管理平台",
        },
        visable: {
            type: Boolean,
            default: false,
        },
        dialogLoad: {
            type: Boolean,
            default: true,
        },
        useSearch: {
            type: Boolean,
            default: true,
        },
        useHandler: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        //这里存放数据
        return {
            dialogVisable: this.visable,
            dialogLoading: this.dialogLoad,
            tableMainHeight: 0,
        };
    },
    //监听属性 类似于data概念
    computed: {
        dialogParams() {
            const { dialogVisable, dialogLoading } = this;

            return {
                dialogVisable,
                dialogLoading,
            };
        },
        useController() {
            return this.useSearch || this.useHandler;
        },
        bodyAreaStyle() {
            return this.useController ? {} : { height: "100%" };
        },
        hasRenderTable() {
            return this.tableMainHeight > 0;
        },
    },
    //监控data中的数据变化
    watch: {
        visable(newVal) {
            this.dialogVisable = newVal;
        },
        dialogLoad(newVal) {
            this.dialogLoading = newVal;
        },
        dialogParams(newVal) {
            this.$emit("dialogChange", newVal);
        },
        load(newVal) {
            if (!newVal) return;
            this.$nextTick().then(() => {
                this.tableMainHeight = this.$refs.tablesMain.clientHeight - 56;
            });
        },
    },
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
@import "~@/assets/style/biz-page.scss";
</style>