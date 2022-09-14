<!--
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\view\warn-level.vue
 * @Author: zhangyang
 * @Date: 2022-08-04 10:58:54
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 13:34:15
 * @Description: 
-->
<script>
import { onMounted, onBeforeUnmount, inject, watch, unref } from "@vue/composition-api";
import { useMapInject } from "../usecase/useMap";
import { useTimeSelectInject } from "../usecase/useTimeSelect";
import { useWarnLevel } from "../usecase/useWarnLevel";

import { isFunction } from "lodash";

export default {
    name: 'warn-level',
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
        const { mapview, GeoJsonLayer, PointLayer } = useMapInject();
        const { timeSelectBiz } = useTimeSelectInject();
        const { useBusiness } = useWarnLevel();

        const {
            setupLegend,
            setupLegendLoading,
            setupOptions,
            peerVisavle,
            clearOptions,
            setupPerrVisable,
            setupTagVisable,
        } = inject("layerLegend");
        setupTagVisable(true);

        const executeQuery = () => {
            setupPerrVisable(true);
            const { doBusiness } = unref(useBusiness)(mapview, {
                GeoJsonLayer,
                PointLayer,
                timeSelectBiz,
                setupLegend,
                setupLegendLoading,
                setupOptions,
            });

            isFunction(doBusiness) && doBusiness();
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

        return {}
    }
};
</script>
<style lang='scss' scoped>
</style>
