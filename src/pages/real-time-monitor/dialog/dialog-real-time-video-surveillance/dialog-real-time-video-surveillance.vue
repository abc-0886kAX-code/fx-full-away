<!--
 * @Author: zhangxin
 * @Date: 2022-05-23 15:19:51
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-23 15:55:21
 * @Description: 
-->
<template>
    <div class="dialog-real-time-video-surveillance">
        dialog-real-time-video-surveillance
    </div>
</template>

<script>
import { onMounted } from "@vue/composition-api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
export default {
    name: "dialog-real-time-video-surveillance",
    //混入
    mixins: [DialogContentMixins],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    setup(props, context) {
        const executeQuery = async () => {
            context.emit("loadStart");

            console.log(props.info);

            context.emit("loadEnd");
        };

        onMounted(() => {
            executeQuery();
        });

        return {};
    },
};
</script>
<style lang='scss' scoped>
</style>