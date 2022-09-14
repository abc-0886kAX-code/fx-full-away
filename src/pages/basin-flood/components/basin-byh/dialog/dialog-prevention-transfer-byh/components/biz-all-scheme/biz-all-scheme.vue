<!--
 * @Author: zhangyang
 * @Date: 2021-05-26 15:07:04
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-21 15:25:57
 * @Description: file content
-->
<template>
    <div class="ytxd-biz-scheme">
        <el-image
            style="width: 100%; height: 100%"
            :src="TotalSolution"
            :fit="fit"
        ></el-image>
    </div>
</template>

<script>
import TotalSolution from "./TotalSolution.jpg";
export default {
    name: "ytxd-biz-all-scheme",
    components: {},
    props: {},
    setup(props, context) {
        context.emit("loadEnd");

        return {
            TotalSolution,
            fit: "scale-down",
        };
    },
};
</script>
<style lang='scss' scoped>
.ytxd-biz-scheme {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>