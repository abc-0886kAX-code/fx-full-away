<!--
 * @Author: zhangxin
 * @Date: 2022-06-27 17:35:18
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-27 17:42:41
 * @Description: 
-->
<template>
    <div class="dialog-alert-generation">
        <dialog-tabs-data :listData="listData"></dialog-tabs-data>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import DialogTabsData from "@/components/dialog-tabs-data";
import { computed } from "@vue/composition-api";
const setupListData = (data) => {
    const { fid, stnm, r, dangerlevel, lgtd, lttd } = data;
    return [
        {
            field: "fid",
            label: "FID",
            value: fid,
            handler: (val) => `${val}`,
        },
        {
            field: "stnm",
            label: "村名",
            value: stnm,
            handler: (val) => `${val}`,
        },
        {
            field: "r",
            label: "降雨差值",
            value: r,
            handler: (val) => `${val}`,
        },
        {
            field: "dangerlevel",
            label: "危险等级",
            value: dangerlevel,
            handler: (val) => `${val}`,
        },
        {
            field: "lgtd",
            label: "经度",
            value: lgtd,
            handler: (val) => `${val}`,
        },
        {
            field: "lttd",
            label: "纬度",
            value: lttd,
            handler: (val) => `${val}`,
        },
    ];
};
export default {
    name: "dialog-alert-generation",
    //混入
    mixins: [DialogContentMixins],
    //import引入的组件需要注入到对象中才能使用
    components: { DialogTabsData },
    props: {},
    setup(props, context) {
        context.emit("loadEnd");
        const listData = computed(() => {
            return setupListData(props.info);
        });
        return {
            listData,
        };
    },
};
</script>
<style lang='scss' scoped>
</style>