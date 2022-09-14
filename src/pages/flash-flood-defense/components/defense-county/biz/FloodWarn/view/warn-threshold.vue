<!--
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\view\warn-threshold.vue
 * @Author: zhangyang
 * @Date: 2022-08-04 10:59:31
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 13:34:11
 * @Description: 
-->
<script>
import { onMounted, onBeforeUnmount, inject, watch, unref } from "@vue/composition-api";
import { usePolygonGrid } from "@/biz/Mars3D/usecase/usePolygonGrid";
import { useMapInject } from "../usecase/useMap";
import { useDataTypeInject } from "../usecase/useDataType";
import { useImageTypeInject } from "../usecase/useImageType";
import { useTimeSelectInject } from "../usecase/useTimeSelect";

import { getWarnThresholdGeoJson } from "../api/threshold.api";

export default {
    name: 'warn-threshold',
    mixins: [],
    components: {},
    props: {
        sign: {
            type: [String, Number],
            default: Date.now()
        }
    },
    render() {
        return {}
    },
    setup(props) {
        const { mapview, GeoJsonLayer } = useMapInject();
        const { setupShape } = usePolygonGrid(mapview);
        const { dataTypeBiz } = useDataTypeInject();
        const { imgTypeBiz } = useImageTypeInject();
        const { timeSelectBiz } = useTimeSelectInject();

        const {
            setupLegend,
            setupLegendLoading,
            setupOptions,
            peerVisavle,
            clearOptions,
            setupPerrVisable,
            setupTagVisable,
        } = inject("layerLegend");
        setupTagVisable(false);

        const executeQuery = async () => {
            setupPerrVisable(true);
            const result = await getWarnThresholdGeoJson({ type: unref(timeSelectBiz).value }).catch(setupOptions).finally(setupLegendLoading);
            GeoJsonLayer.clear();
            GeoJsonLayer.find().load(setupShape(result));
            setupLegend(result);
        }
        function toRequest() {
            setupOptions(executeQuery);
            executeQuery();
        }

        watch(() => props.sign, toRequest);

        onMounted(() => {
            setupOptions();
        });

        onBeforeUnmount(() => {
            GeoJsonLayer.clear();
            unref(peerVisavle) && clearOptions();
        });

        return {
            dataTypeBiz,
            imgTypeBiz,
            timeSelectBiz
        }
    }
};
</script>
<style lang='scss' scoped>
</style>
