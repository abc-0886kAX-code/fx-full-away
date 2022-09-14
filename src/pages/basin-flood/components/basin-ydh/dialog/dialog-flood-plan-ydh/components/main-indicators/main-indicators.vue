<!--
 * @Author: zhangxin
 * @Date: 2022-04-13 17:44:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-29 13:17:28
 * @Description: 
-->
<template>
    <div class="ytxd-main-indicators">
        <el-image
            style="width: 100%; height: auto"
            :preview-src-list="[image]"
            :src="image"
        ></el-image>
    </div>
</template>

<script>
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";

export default {
    name: "ytxd-main-indicators",
    mixins: [DialogContentMixins],
    components: {},
    props: {},
    setup(props, context) {
        return {
            image: process.env.VUE_APP_IMG_HOST + props.info.technology,
        };
    },
};
</script>
<style lang='scss' scoped>
.ytxd-main-indicators {
    height: 100%;
    width: 98%;
    overflow-x: hidden;
    overflow-y: auto;
    white-space: pre-wrap;
    color: #fff;
    margin: 0 auto;
}
</style>