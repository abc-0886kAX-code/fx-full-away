<!--
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\biz\FloodWarn\view\manual-control.vue
 * @Author: zhangyang
 * @Date: 2022-08-04 17:09:50
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 09:33:16
 * @Description: 
-->
<template>
    <el-button-group class='manual-control'>
        <el-button size="mini" :type="editButtonType" @click="handlerEdit">
            {{ editButtonTitle }}
        </el-button>

        <el-button size="mini" type="success" :disabled="disabled" @click="handlerOutput">
            提交出图
        </el-button>

        <el-button size="mini" type="danger" :disabled="disabled" @click="handlerClear">
            清除选点
        </el-button>
    </el-button-group>
</template>

<script>
import { inject, onMounted, onBeforeUnmount, watch, unref, computed, ref } from "@vue/composition-api";
import { setupBillboardShape } from "@/biz/Mars3D/usecase/useBillboard";
import { useMapInject } from "../usecase/useMap";

import { getManualDataList, clearManualData } from "../api/common.api";
import { EventType, LngLatPoint, graphic } from "mars3d";
import { flake } from "maggot-utils";
import SoilIcon from "@/assets/icon/soil-icon.png";

const { BillboardEntity } = graphic;
const flotColumn = [
    {
        label: "1小时累计雨量",
        field: "1h",
    },
    {
        label: "3小时累计雨量",
        field: "3h",
    },
    {
        label: "6小时累计雨量",
        field: "6h",
    },
    {
        label: "12小时累计雨量",
        field: "12h",
    },
];
const setupFloat = (target) => {
    const { attr } = target.graphic;
    return flotColumn.map((item) => {
        const { label, field } = item;
        return {
            label,
            field,
            text: attr[field] ?? "--",
        };
    });
};
const setupManualPoint = (source) => {
    const {
        lgtd: longitude,
        lttd: latitude,
        stcd: id,
    } = source;
    const shape = setupBillboardShape({
        longitude,
        latitude,
        image: SoilIcon,
    });

    return new BillboardEntity({
        name: id ?? flake.gen(),
        id,
        attr: {
            ...source,
            lng: longitude,
            lat: latitude,
            name: "人工测绘数据",
            dialogName: "manual-point-save",
            size: { w: "40%", h: "40vh" },
            setupFloat
        },
        ...shape,
    });
};

export default {
    name: 'manual-control',
    mixins: [],
    components: {},
    props: {},
    setup(props, context) {
        const { mapview, PointLayer } = useMapInject();
        const { dialogNoticeKey, dialogHandler } = inject("dialog");

        // true 编辑中 false 未编辑
        const editStatus = ref(false);
        const disabled = ref(true);
        const editButtonType = computed(() => unref(editStatus) ? 'warning' : 'primary');
        const editButtonTitle = computed(() => unref(editStatus) ? '结束选点' : '开始选点');

        function setupEditStatus(status = false) {
            editStatus.value = status;
            unref(editStatus)
                ? unref(mapview).on(EventType.clickMap, handlerClickMap)
                : unref(mapview).off(EventType.clickMap, handlerClickMap);
        }
        function switchEditStatus() {
            setupEditStatus(!unref(editStatus));
        }
        function setupDisabled(status = true) {
            disabled.value = status;
        }
        function handlerEdit() {
            switchEditStatus();
        }
        function handlerOutput() {
            setupEditStatus();
            context.emit("output");
        }
        async function handlerClear() {
            setupEditStatus();
            await clearManualData();
            executeQuery();
        }
        function handlerClickMap(event) {
            const { cartesian } = event;
            const point = LngLatPoint.fromCartesian(cartesian);
            dialogHandler({
                title: "人工测绘数据",
                props: point,
                name: "manual-point-save",
                size: {
                    w: "40%",
                    h: "40vh"
                }
            });
        }
        async function executeQuery() {
            const data = await getManualDataList().finally();
            setupDisabled(data.length <= 0);
            const points = data.map(setupManualPoint);
            PointLayer.clear();
            PointLayer.find().addGraphic(points);
        }

        watch(editStatus, (newVal) => newVal && context.emit("clearGeo"));
        watch(dialogNoticeKey, executeQuery);

        onMounted(() => {
            executeQuery();
        });
        onBeforeUnmount(() => {
            unref(mapview).off(EventType.clickMap, handlerClickMap);
        });

        return {
            editStatus,
            disabled,
            editButtonType,
            editButtonTitle,
            handlerEdit,
            handlerOutput,
            handlerClear
        }
    }
};
</script>
<style lang='scss' scoped>
</style>
