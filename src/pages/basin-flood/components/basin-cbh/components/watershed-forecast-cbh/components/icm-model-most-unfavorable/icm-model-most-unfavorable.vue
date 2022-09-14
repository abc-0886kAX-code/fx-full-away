<!--
 * @Author: zhangxin
 * @Date: 2022-07-07 09:37:34
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-13 11:11:53
 * @Description: 
-->
<template>
    <div class="icm-model-most-unfavorable">
        <el-button
            style="margin-left: 10px"
            plain
            type="danger"
            size="mini"
            :disabled="playState || status"
            @click="loadLayer"
            >最不利</el-button
        >
        <el-button
            style="margin-left: 10px"
            plain
            type="info"
            size="mini"
            :disabled="playState || !status"
            @click="clearLayer"
            >重置</el-button
        >
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import stroe from "@/stroe";
import { usePlaySliceState } from "@/biz/PlaySlice/usecase/usePlaySliceState";
import { useUnfavorableLayerRender } from "./useUnfavorableLayerRender";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import useUserLocation from "@/biz/User/usecase/useUserLocation";
import { onBeforeUnmount, unref, ref, computed } from "@vue/composition-api";
export default {
    name: "icm-model-most-unfavorable",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    setup() {
        const status = ref(false);
        const layer = ref();
        const { mapview } = useMars3d();
        const { resetMapviewLocation } = useUserLocation(mapview);
        const { clearUnfavorableLayer, setupUnfavorableLayer } =
            useUnfavorableLayerRender(unref(mapview));
        const { playState } = usePlaySliceState();
        const params = computed(() => {
            return {
                params: `${stroe.getters.getModelSimid}_Max_zones`,
                id: "icm-model-most-unfavorable",
            };
        });
        const loadLayer = () => {
            status.value = true;
            layer.value = setupUnfavorableLayer(unref(params));
            resetMapviewLocation();
            return layer;
        };

        const clearLayer = () => {
            status.value = false;
            clearUnfavorableLayer();
        };

        onBeforeUnmount(() => {
            clearUnfavorableLayer();
        });

        return { playState, loadLayer, clearLayer, status };
    },
};
</script>
<style lang='scss' scoped>
</style>