<!--
 * @FilePath: \3D防汛作战\src\components\dialog-tabs-data\dialog-tabs-data.vue
 * @Author: zhangyang
 * @Date: 2022-06-21 09:42:14
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-22 13:42:37
 * @Description: 
-->
<template>
    <div class="dialog-tabs-data ytxd-biz-info">
        <div class="introduce-box" v-for="item in listData" :key="item.field">
            <h4>{{ item.label }}：</h4>
            <p>{{ item.handler(item.value) }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "dialog-tabs-data",
    mixins: [],
    props: {
        listData: {
            type: Array,
            default: () => [],
        },
    },
    //import引入的组件需要注入到对象中才能使用
    components: {},
    setup() {
        return {};
    },
};
</script>
<style lang='scss' scoped>
@import "./dialog-tabs-data.scss";
@import "~@/assets/style/biz-info.scss";
</style>
