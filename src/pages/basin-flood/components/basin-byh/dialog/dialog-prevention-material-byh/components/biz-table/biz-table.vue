<!--
 * @Author: zhangyang
 * @Date: 2021-05-26 15:07:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-29 14:28:50
 * @Description: file content
-->
<template>
    <div class="ytxd-biz-table">
        <mg-table
            :tableSchema="tableSchema"
            :tableData="tableData[tableIndex]"
            :total="tableTotal"
            @tableHandle="tableHandle"
        ></mg-table>
    </div>
</template>

<script>
import { chunk } from "lodash";
import { getMTList } from "@/pages/basin-flood/components/basin-cbh/api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
export default {
    name: "ytxd-biz-table",
    mixins: [DialogContentMixins],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            tableSchema: {
                uiSchema: {
                    isIndex: true,
                    isPage: true,
                    stripe: true,
                },
                columnSchema: [
                    {
                        prop: "name",
                        mold: "default",
                        label: "物资名称",
                        width: 160,
                        align: "center",
                    },
                    {
                        prop: "units",
                        mold: "default",
                        label: "单位",
                        align: "center",
                    },
                    {
                        prop: "number",
                        mold: "default",
                        label: "数量",
                        align: "center",
                    },
                    {
                        prop: "model",
                        mold: "default",
                        label: "型号",
                        width: 150,
                        align: "center",
                    },
                    {
                        prop: "hwid",
                        mold: "default",
                        label: "所在仓库ID",
                        align: "center",
                    },
                    {
                        prop: "users",
                        mold: "default",
                        label: "管理员",
                        width: 120,
                        align: "center",
                    },
                    {
                        prop: "tel",
                        mold: "default",
                        label: "联系方式",
                        width: 180,
                        align: "center",
                    },
                    {
                        prop: "lgtd",
                        mold: "default",
                        label: "经度",
                        align: "center",
                    },
                    {
                        prop: "lttd",
                        mold: "default",
                        label: "纬度",
                        align: "center",
                    },
                ],
            },
            tableRequest: {
                current: 1,
                size: 10,
            },
            siteData: [],
        };
    },
    //监听属性 类似于data概念
    computed: {
        tableData() {
            const { size } = this.tableRequest;
            const table = this.siteData;
            return chunk(table.reverse(), size);
        },
        tableTotal() {
            return this.siteData.length;
        },
        tableIndex() {
            const { current } = this.tableRequest;

            return current - 1;
        },
        params() {
            return this.info.stcd;
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        tableHandle(handle) {
            this.tableRequest = Object.assign({}, this.tableRequest, handle);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.$emit("loadStart");
        getMTList(this.params)
            .then((res) => {
                this.siteData = res;
                this.$emit("loadEnd");
            })
            .catch((err) => {
                console.log(err);
            });
    },
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
.ytxd-biz-table {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>