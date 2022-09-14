<!--
 * @Author: zhangxin
 * @Date: 2022-04-14 11:18:44
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-17 11:35:43
 * @Description: 
-->
<template>
    <div class="water-level">
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
    name: "water-level",
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
                        prop: "waterlevel",
                        mold: "default",
                        label: "水位(m)",
                        width: 100,
                    },
                    {
                        prop: "kr",
                        mold: "default",
                        label: "库容(百万m³)",
                        width: 150,
                    },
                    {
                        prop: "area",
                        mold: "default",
                        label: "面积(km²)",
                        width: 100,
                    },
                    {
                        prop: "yhd",
                        mold: "default",
                        label: "溢洪道(m³/s)",
                        width: 150,
                    },
                    {
                        prop: "xhd",
                        mold: "default",
                        label: "泄洪洞(m³/s)",
                        width: 150,
                    },
                    {
                        prop: "xxl",
                        mold: "default",
                        label: "合计(m³/s)",
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
.water-level {
    width: 100%;
    height: 100%;
}
</style>