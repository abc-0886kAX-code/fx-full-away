<!--
 * @Author: zhangyang
 * @Date: 2022-04-25 10:13:44
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-05-09 13:36:21
 * @Description: file content
-->
<template>
    <div class="mars3d-test">
        <h1 :style="style">{{ text }}</h1>
        <el-button type="primary" size="mini">定位</el-button>
        <el-button type="primary" size="mini">查看</el-button>
    </div>
</template>

<script>
import { unref, computed } from "@vue/composition-api";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";

const TestPoint = {
    angle: 90,
    code: "30300099",
    latitude: 40.0645,
    longitude: 116.7547,
    name: "苏庄（坝上）",
    sttp: "ZQ",
};

export default {
    name: "mars3d-test",
    components: {},
    props: {
        text: {
            type: String,
            default: "mars3d test"
        },
        top: {
            type: Number,
            default: 0
        }
    },
    setup(props) {
        const style = computed(() => ({
            top: `${props.top}px`
        }));
        const { mapview } = useMars3d();
        const { gather, setupLayer } = useLayer(mapview);

        setupLayer({
            type: "graphic",
            name: "SiteLayer"
        });

        console.log(unref(gather));

        return {
            style
        };
    },
};
</script>

<style lang='scss' scoped>
.mars3d-test {
    position: absolute;
    left: 0;
    z-index: 102;
    background-color: red;
}
</style>