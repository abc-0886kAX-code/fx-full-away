<!--
 * @Author: zhangyang
 * @Date: 2022-04-22 09:49:44
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-27 14:58:08
 * @Description: file content
-->
<template>
    <div class='panel-extend-table' v-loading="tableLoading">
        <el-checkbox-group v-model="checkGather" @change="handlerChange">
            <el-row :gutter="20">
                <template v-for="(group, index) in tableData">
                    <el-col class="panel-extend-table-label" :key="index" :span="8">
                        <el-checkbox :label="group.name" :disabled="checkDisabled(group)">
                        </el-checkbox>
                        <i class="panel-extend-table-label-icon"></i>
                    </el-col>
                </template>
            </el-row>
        </el-checkbox-group>

        <el-table style="width: 100%" :data="tableDataCount" row-key="name" :height="height" :max-height="height"
            size="medium" :fit="true" :border="true" :stripe="true" :default-expand-all="false"
            :highlight-current-row="true" :tree-props="{ children: 'children' }">
            <el-table-column prop="name" label="雨量范围" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="rainfall" label="雨量" align="center" header-align="center">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { sum } from "lodash";

import { useTableDataInject } from "@/biz/Table";
import { default as PanelCellMixins } from '@/mixins/panel-cell.mixins';

// 合计所有范围内的雨量总和
const setupCensus = (item) => {
    const { children } = item;

    if (children && children.length <= 0) return {
        ...item,
        rainfall: "-",
    };

    return {
        ...item,
        rainfall: parseInt(sum(children.map(item => item.rainfall))),
    }
}

export default {
    name: 'panel-extend-table',
    mixins: [PanelCellMixins],
    components: {},
    props: {
        id: {
            type: String,
            default: 'default',
        },
        height: String
    },
    setup(props) {
        const {
            tableSign,
            tableLoading,
            tableData
        } = useTableDataInject(props.id);

        return {
            tableSign,
            tableLoading,
            tableData
        }
    },
    data() {
        //这里存放数据
        return {
            checkGather: [],
        };
    },
    //监听属性 类似于data概念
    computed: {
        checkDisabled() {
            return function (group) {
                const { children } = group;

                return children && children.length <= 0;
            }
        },
        tableDataCount() {
            return this.tableData.map(setupCensus);
        }
    },
    //监控data中的数据变化
    watch: {
        tableSign() {
            this.setupCheckGather();
        }
    },
    //方法集合
    methods: {
        handlerCollect() {
            return {
                name: 'panel-extend-table',
            }
        },
        handlerChange(list) {
            // render site
            console.log(list);
        },
        setupCheckGather() {
            this.checkGather = this.tableData.filter(item => item?.children.length > 0).map(item => item.name);
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
@import "./panel-extend-table.scss";
</style>