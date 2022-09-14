<!--
 * @Author: zhangyang
 * @Date: 2021-05-21 13:32:44
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-01 11:32:16
 * @Description: file content
-->
<template>
    <div class="ytxd-map-check-box">
        <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
        >
        <el-checkbox-group v-model="checkedMap">
            <el-checkbox
                v-for="cell in checkMap"
                :label="cell.label"
                :key="cell.label"
                :checked="cell.status"
                >{{ cell.title }}</el-checkbox
            >
        </el-checkbox-group>
    </div>
</template>

<script>
import { isBoolean } from "lodash";

function getLabel(cell) {
    const { label } = cell;
    return label;
}

function getStatus(cell) {
    const { status } = cell;
    return isBoolean(status) && status;
}
function getChecked(list) {
    return list.filter(getStatus).map(getLabel);
}
export default {
    name: "ytxd-map-check-box",
    mixins: [],
    components: {},
    props: {
        checkMap: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        //这里存放数据
        return {
            checkAll: false,
            isIndeterminate: false,
            checkedMap: [],
        };
    },
    //监听属性 类似于data概念
    computed: {
        getCheckedLength() {
            return getChecked(this.checkedMap).length;
        },
    },
    //监控data中的数据变化
    watch: {
        "checkedMap.length": {
            handler() {
                this.noticeCaller(this.checkedMap);
            },
        },
    },
    //方法集合
    methods: {
        noticeCaller(checkList) {
            this.handleCheckedChange(checkList);

            this.checkMap.forEach((cell) => {
                const { label, switchFunc } = cell;

                const isIndexof = checkList.indexOf(label) < 0;

                switchFunc(!isIndexof);
            });
        },
        handleCheckAllChange(checkAll) {
            this.checkedMap = checkAll ? this.checkMap.map(getLabel) : [];
            this.isIndeterminate = false;
        },
        handleCheckedChange(value) {
            const checkedCount = value.length;
            this.checkAll = checkedCount === this.checkMap.length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.checkMap.length;
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
@import "./map-check-box.scss";
</style>