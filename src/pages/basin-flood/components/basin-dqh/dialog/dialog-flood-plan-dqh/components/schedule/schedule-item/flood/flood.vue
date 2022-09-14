<!--
 * @Author: zhangxin
 * @Date: 2022-04-14 11:18:44
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-14 14:40:06
 * @Description: 
-->
<template>
    <div class="flood">
        <mg-table
            :tableSchema="tableSchema"
            :tableData="tableData[tableIndex]"
            :total="tableTotal"
            @tableHandle="tableHandle"
        ></mg-table>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { chunk } from "lodash";
export default {
    name: "flood",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            tableSchema: {
                uiSchema: {
                    isIndex: false,
                    isPage: true,
                    stripe: true,
                },
                columnSchema: [
                    {
                        prop: "hscxq",
                        mold: "default",
                        label: "洪水重现期",
                        width: 100,
                    },
                    {
                        prop: "ymcz",
                        mold: "default",
                        label: "淹没村庄",
                    },
                    {
                        prop: "hs",
                        mold: "default",
                        label: "户数(户)",
                        width: 100,
                    },
                    {
                        prop: "rk",
                        mold: "default",
                        label: "人口(人)",
                        width: 100,
                    },
                    {
                        prop: "fj",
                        mold: "default",
                        label: "房间(间)",
                        width: 100,
                    },
                    {
                        prop: "gd",
                        mold: "default",
                        label: "耕地(亩)",
                        width: 100,
                    },
                ],
            },
            tableRequest: {
                current: 1,
                size: 10,
            },
        };
    },
    //监听属性 类似于data概念
    computed: {
        // getTableData() {
        //     const { TableData } = this.$attrs;

        //     return TableData;
        // },
        tableData() {
            const { TableData } = this.$attrs;

            const { size } = this.tableRequest;

            return chunk(TableData, size);
        },
        tableTotal() {
            const { TableData } = this.$attrs;
            return TableData.length;
        },
        tableIndex() {
            const { current } = this.tableRequest;

            return current - 1;
        },
    },
    //监控data中的数据变化
    watch: {
        // getTableData: {
        //     handler(newVal) {
        //         console.log(newVal);
        //     },
        //     immediate: true,
        // },
    },
    //方法集合
    methods: {
        tableHandle(handle) {
            this.tableRequest = Object.assign({}, this.tableRequest, handle);
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
.flood {
    width: 100%;
    height: 100%;
}
</style>