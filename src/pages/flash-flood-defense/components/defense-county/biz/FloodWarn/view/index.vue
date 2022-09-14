<!--
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\view\index.vue
 * @Author: zhangyang
 * @Date: 2022-08-03 11:27:17
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 09:30:42
 * @Description: 
-->
<template>
    <div class='flood-warn'>
        <el-form size="mini">
            <el-form-item label="数据类型">
                <el-radio-group v-model="dataTypeKey" @change="handlerBizWait">
                    <template v-for="(node, key) in dataTypeEnum">
                        <el-radio-button :key="key" :label="key">{{ node.label }}</el-radio-button>
                    </template>
                </el-radio-group>
            </el-form-item>

            <el-form-item v-if="hasDrawControl" label="绘制操作">
                <manual-control @output="handlerBizWait" @clearGeo="handlerClearLayer"></manual-control>
            </el-form-item>

            <el-form-item label="预警分析">
                <el-radio-group v-model="imgTypeKey" @change="handlerBizWait">
                    <template v-for="(node, key) in imgTypeEnum">
                        <el-radio-button :key="key" :label="key">{{ node.label }}</el-radio-button>
                    </template>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="累计时间">
                <el-select v-model="timeSelectKey" placeholder="请选择累计雨量时间" @change="handlerBizWait">
                    <template v-for="(item, key) in timeSelectEnum">
                        <el-option :key="key" :value="key" :label="`${item.label}累计雨量`"></el-option>
                    </template>
                </el-select>
            </el-form-item>
        </el-form>

        <component :is="`warn-${imgTypeKey}`" :sign="sign"></component>
    </div>
</template>

<script>
import ManualControl from "./manual-control.vue";
import WarnLevel from "./warn-level.vue";
import WarnArea from "./warn-area.vue";
import WarnThreshold from "./warn-threshold.vue";

import { onMounted, onBeforeUnmount, watch, unref, computed } from "@vue/composition-api";
import useUserLocation from "@/biz/User/usecase/useUserLocation";
import { useMap } from "../usecase/useMap";
import { useDataType } from "../usecase/useDataType";
import { useImageType } from "../usecase/useImageType";
import { useTimeSelect } from "../usecase/useTimeSelect";
import { Sign } from "@/biz/share/entify/Sign";

import { debounce } from "lodash";

export default {
    label: "山洪预警",
    name: 'flood-warn',
    mixins: [],
    components: {
        ManualControl,
        WarnLevel,
        WarnArea,
        WarnThreshold,
    },
    props: {},
    setup() {
        const { sign, setupSign } = Sign();
        const { mapview, PointLayer, GeoJsonLayer, } = useMap();
        const { resetMapviewLocation } = useUserLocation(mapview);
        const dataType = useDataType();
        const imgType = useImageType();
        const timeSelect = useTimeSelect();
        const hasDrawControl = computed(() => unref(dataType.dataTypeBiz).key === "manual");
        const handlerBizWait = debounce(handlerBiz, 300);
        function handlerBiz() {
            if (!unref(hasDrawControl)) PointLayer.clear();

            GeoJsonLayer.clear();
            resetMapviewLocation();
            setupSign();
        }
        function handlerClearLayer() {
            GeoJsonLayer.clear();
        }

        watch(dataType.dataTypeKey, imgType.imgTypeResetKey);
        watch(imgType.imgTypeKey, timeSelect.timeSelectResetKey);

        onMounted(() => {
            handlerBiz();
        });

        onBeforeUnmount(() => {
            PointLayer.clear();
            GeoJsonLayer.clear();
        });

        return {
            sign,
            ...dataType,
            ...imgType,
            ...timeSelect,
            hasDrawControl,
            handlerBiz,
            handlerBizWait,
            handlerClearLayer,
        }
    }
};
</script>
<style lang='scss' scoped>
.flood-warn {
    width: 100%;
    height: calc(100% - 50px);
    overflow-x: hidden;
    overflow-y: auto;
}

/deep/.el-form-item__label {
    color: #fff;
}
</style>
