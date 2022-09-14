<!--
 * @FilePath: \3D防汛作战\src\pages\basin-flood\components\basin-cbh\components\basic-data-cbh\components\gate-dam.vue
 * @Author: zhangyang
 * @Date: 2022-06-17 10:18:58
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-22 10:22:29
 * @Description: 闸坝
-->
<script>
import { onBeforeUnmount } from "@vue/composition-api";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";

import { DAM_SERVICE } from "@/config/arcgis.conf";

export default {
    name: "gate-dam",
    mixins: [],
    components: {},
    props: {},
    render() {
        return {};
    },
    setup() {
        const { mapview } = useMars3d();
        const { setupLayer } = useLayer(mapview);
        const layer = setupLayer({
            type: "arcgis",
            name: "JYHBoundaryLayer",
            enablePickFeatures: false,
            url: DAM_SERVICE,
            zIndex: 1005,
        });

        onBeforeUnmount(() => {
            layer.remove();
        });

        return {};
    },
};
</script>
<style lang='scss' scoped>
</style>
