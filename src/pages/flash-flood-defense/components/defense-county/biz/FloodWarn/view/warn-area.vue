<!--
 * @FilePath: \防汛大屏\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\view\warn-area.vue
 * @Author: zhangyang
 * @Date: 2022-08-04 10:59:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-08 16:18:37
 * @Description: 
-->
<template>
    <div class="warn-area">
        <div class="warn-area-item">
            <div class="warn-area-item-head">
                <h3 class="warn-area-item-head-title">预警生成</h3>
            </div>
            <div class="warn-area-item-body">
                <el-button size="mini" type="primary" @click="toDialog">查看风险区域村庄表</el-button>
            </div>
        </div>
        <div class="warn-area-item">
            <div class="warn-area-item-head">
                <h3 class="warn-area-item-head-title">预警发布</h3>
            </div>
            <div class="warn-area-item-body">
                <el-button size="mini" type="primary" @click="toExport">导出报表</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, onBeforeUnmount, inject, watch, unref } from "@vue/composition-api";
import { useMapInject } from "../usecase/useMap";
import { useAnalysisPonitRender } from "@/pages/flash-flood-defense/hooks/useAnalysisPonitRender";
import { useTimeSelectInject } from "../usecase/useTimeSelect";
import { useWarnArea } from "../usecase/useWarnArea";
import { useDataTypeInject } from "../usecase/useDataType";
import { isFunction } from "lodash";
const exportDangerSiteParams = {
    forecast: "prediction",
    actual: "measured",
    manual: "artificial"
};

export default {
    name: "warn-area",
    mixins: [],
    components: {},
    props: {
        sign: {
            type: [String, Number],
            default: Date.now()
        }
    },
    setup(props) {
        const { mapview, HomePointLayer, GeoJsonLayer, PointLayer } = useMapInject();
        const { basicList, setupPonitRender } = useAnalysisPonitRender(mapview);
        const { timeSelectBiz } = useTimeSelectInject();
        const { dataTypeBiz } = useDataTypeInject();
        const { hasManual, useBusiness } = useWarnArea();

        const { setupLegend, setupLegendLoading, setupOptions, peerVisavle, clearOptions, setupPerrVisable, setupTagVisable } =
            inject("layerLegend");
        const { dialogHandler } = inject("dialog");
        setupTagVisable(true);
        const bizOptions = {
            GeoJsonLayer,
            PointLayer,
            timeSelectBiz,
            setupLegend,
            setupLegendLoading,
            setupOptions,
            setupPonitRender
        };

        const executeQuery = () => {
            setupPerrVisable(true);
            const { doBusiness } = unref(useBusiness)(mapview, bizOptions);

            isFunction(doBusiness) && doBusiness();
        };
        function toRequest() {
            setupOptions(executeQuery);
            executeQuery();
        }

        function toExport() {
            const { doExport } = unref(useBusiness)(mapview, bizOptions);
            isFunction(doExport) && doExport();
        }
        function toDialog() {
            dialogHandler({
                title: "风险区域村庄表",
                props: {
                    dangertype: unref(timeSelectBiz).value,
                    basicList: unref(basicList),
                    type: exportDangerSiteParams[unref(dataTypeBiz).key]
                },
                name: "dialog-alert-generation-table"
            });
        }

        watch(() => props.sign, toRequest);

        onMounted(() => {
            setupOptions();
        });

        onBeforeUnmount(() => {
            if (!unref(hasManual)) PointLayer.clear();
            HomePointLayer.clear();
            GeoJsonLayer.clear();
            unref(peerVisavle) && clearOptions();
        });

        return {
            toExport,
            toDialog
        };
    }
};
</script>
<style lang='scss' scoped>
.warn-area {
    width: 100%;
    padding: 6px;
    box-sizing: border-box;

    &-item {
        width: 100%;
        padding: 12px;
        border: 1px solid #e6e6e6;
        border-radius: 6px;
        box-sizing: border-box;

        & + & {
            margin-top: 20px;
        }

        &-head,
        &-body {
            width: 100%;
        }

        &-head {
            margin-bottom: 20px;

            &-title {
                font-size: 16px;
            }
        }
    }
}
</style>
