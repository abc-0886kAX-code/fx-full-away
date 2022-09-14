<!--
 * @Author: zhangyang
 * @Date: 2022-04-24 18:12:18
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-05-09 15:42:30
 * @Description: file content
-->
<template>
    <div class='mars3d-container' ref="mapbox" v-loading="loading" v-bind="loadStyle">
        <slot v-if="isMounted"></slot>
    </div>
</template>

<script>
import { useMars3dSetup } from "@/biz/Mars3D/usecase/useMars3dSetup";
import { useLayerSetup } from "@/biz/Mars3D/usecase/useLayerSetup";

export default {
    name: 'mars3d-container',
    mixins: [],
    components: {},
    props: {
        config: {
            type: Object,
            default: () => ({})
        },
        layers: {
            type: Array,
            default: () => ([])
        }
    },
    emit: ["onReady"],
    setup(props, ctx) {
        const {
            isMounted,
            loading,
            loadStyle,
            mapbox,
            mapview,
        } = useMars3dSetup(props, ctx);
        useLayerSetup(props, mapview);
        // useDialog();

        return {
            isMounted,
            loading,
            loadStyle,
            mapbox,
            mapview
        }
    }
};
</script>
<style lang='scss' scoped>
@import "./mars3d-container.scss";
</style>