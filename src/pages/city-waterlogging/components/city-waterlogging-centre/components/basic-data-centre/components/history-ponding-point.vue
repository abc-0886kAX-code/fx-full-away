<!--
 * @Author: zhangxin
 * @Date: 2022-06-30 10:41:15
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-30 15:46:18
 * @Description: 
-->
<template>
    <div class="history-ponding-point"></div>
</template>

<script>
import { graphic, EventType } from "mars3d";
import {
    onBeforeUnmount,
    onMounted,
    unref,
    inject,
} from "@vue/composition-api";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useLocation } from "@/biz/Mars3D/usecase/useLocation";
import { setupBillboardShape } from "@/biz/Mars3D/usecase/useBillboard";
import { default as useWebBasicData } from "@/biz/BasicData/useWebBasicData";
import { useMars3dEvent } from "@/biz/Mars3D/usecase/useMars3dEvent";

import { queryArcGIS } from "@/biz/ArcGIS/share";
import { LSJSDSITE_SERVICE, setupServiceID } from "@/config/arcgis.conf";
const tableColumn = [
    {
        prop: "积水点",
        label: "积水点",
    },
    {
        prop: "类别",
        label: "类别",
    },
    {
        prop: "所在区",
        label: "所在区",
    },
];

const { BillboardEntity } = graphic;

const setupFloat = (target) => {
    const { attr } = target.graphic;
    return tableColumn.map((item) => {
        const { label, prop: field } = item;
        return {
            label,
            field,
            text: attr[field] ?? "--",
        };
    });
};
const setupConePoint =
    ({ legend }) =>
    ({ attributes, geometry }) => {
        const { 积水点: name, FID: id } = attributes;
        const { x: longitude, y: latitude } = geometry;
        const shape = setupBillboardShape({
            longitude,
            latitude,
            image: legend,
        });

        return new BillboardEntity({
            name,
            id,
            attr: {
                ...attributes,
                dialogName: "dialog-history-ponding-point",
                setupFloat,
            },
            ...shape,
        });
    };

export default {
    name: "history-ponding-point",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
        node: Object,
    },
    setup(props) {
        const { mapview } = useMars3d();
        const { gather, setupLayer } = useLayer(mapview);
        const layer = setupLayer({
            type: "graphic",
            name: "HistoryPondingPointLayer",
            zIndex: 1005,
        });
        const layerEnity = unref(gather).HistoryPondingPointLayer;
        const layerTarget = useLocation(layerEnity);

        const { dialogHandler } = inject("dialog");
        const { setupFloatHide, setupFloatWindow } = inject("float");

        const handlerClick = (target) => {
            const { graphic } = target;
            const { attr: props, name: title } = graphic;
            const { dialogName: name } = props;

            setupFloatHide();
            dialogHandler({
                title,
                props,
                name,
            });
        };
        const handlerOver = (target) => {
            const { graphic, startPosition } = target;
            setupFloatWindow({
                content: graphic.attr?.setupFloat(target),
                ...startPosition,
            });
        };

        const { setupBind } = useMars3dEvent({
            [EventType.click]: handlerClick,
            [EventType.mouseOver]: handlerOver,
            [EventType.mouseOut]: setupFloatHide,
        });

        useWebBasicData({
            ...layerTarget,
            tag: "FloodControlPlug",
            executeQuery,
        });

        async function executeQuery() {
            const { features } = await queryArcGIS(
                setupServiceID(LSJSDSITE_SERVICE, "0/query")
            );
            const points = features.map(setupConePoint(props.node));
            return { features, points };
        }

        onMounted(() => {
            setupBind(layer);
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