<!--
 * @Author: zhangxin
 * @Date: 2022-05-26 14:23:35
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-06 16:42:14
 * @Description: 
-->
<template>
    <div class="tab-details ytxd-biz-info">
        <div
            class="introduce-box"
            v-for="(item, index) in caption"
            :key="index"
        >
            <h4>{{ item.label }}</h4>
            <p>{{ item.value }}</p>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { onMounted, ref } from "@vue/composition-api";

export default {
    name: "tab-details",
    //混入
    mixins: [DialogContentMixins],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    setup(props, context) {
        const caption = ref([
            {
                field: "stcd",
                label: "编码",
                value: "",
            },
            {
                field: "stnm",
                label: "名字",
                value: "",
            },
            {
                field: "lgtd",
                label: "经度",
                value: "",
            },
            {
                field: "lttd",
                label: "纬度",
                value: "",
            },
            {
                field: "stlc",
                label: "地址",
                value: "",
            },
            {
                field: "tm",
                label: "时间",
                value: "",
            },
            {
                field: "q",
                label: "流量",
                value: "",
                handler: (value) => {
                    return `${value}(m³/s)`;
                },
            },
            {
                field: "z",
                label: "水位",
                value: "",
                handler: (value) => {
                    return `${value}m`;
                },
            },
        ]);

        const executeQuery = async () => {
            context.emit("loadStart");

            caption.value.forEach((item) => {
                item.handler
                    ? (item.value = item.handler(props.info[item.field]))
                    : (item.value = props.info[item.field]);

                return item;
            });

            context.emit("loadEnd");
        };

        onMounted(async () => {
            await executeQuery();
        });

        return {
            executeQuery,
            caption,
        };
    },
};
</script>
<style lang='scss' scoped>
.tab-details {
    height: calc(100% - 60px) !important;
}
@import "~@/assets/style/biz-info.scss";
</style>