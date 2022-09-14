<!--
 * @Author: zhangxin
 * @Date: 2022-06-30 10:41:15
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-01 10:42:39
 * @Description: 
-->
<template>
    <div class="sponge-ponding-point"></div>
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
import { HMCSITE_SERVICE, setupServiceID } from "@/config/arcgis.conf";
import { isUndefined } from "lodash";
import ScopedPoint from "@/assets/icon/sponge-ponding-point-two.png";

// 暂时处理经纬度为0的3条数据
const consolidateData = (firstPonit, scopedPoint) => {
    return [
        ...firstPonit.filter((item) => item.attributes.X),
        ...scopedPoint.filter((item) => {
            item["type"] = "scopedPoint";
            return item.attributes.X;
        }),
    ];
};

const tableColumn = [
    {
        prop: "积水点名称",
        label: "积水点名称",
    },
    {
        prop: "行政区",
        label: "行政区",
    },
];
const ScopedPointTableColumn = [
    {
        prop: "标注名称",
        label: "标注名称",
    },
    {
        prop: "行政区",
        label: "行政区",
    },
];

const setupFloat = (target) => {
    const { attr } = target.graphic;
    const { type } = attr;
    if (type !== "scopedPoint") {
        return tableColumn.map((item) => {
            const { label, prop: field } = item;
            return {
                label,
                field,
                text: attr[field] ?? "--",
            };
        });
    } else {
        return ScopedPointTableColumn.map((item) => {
            const { label, prop: field } = item;
            return {
                label,
                field,
                text: attr[field] ?? "--",
            };
        });
    }
};

const { BillboardEntity } = graphic;

const setupConePoint =
    ({ legend }) =>
    ({ attributes, type }) => {
        return isUndefined(type)
            ? createFirstPonit(attributes, legend)
            : createScopedPoint(attributes, type);
    };

const createFirstPonit = (attributes, legend) => {
    const { X: longitude, Y: latitude, 积水点名称: name, FID: id } = attributes;
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
            dialogName: "dialog-sponge-ponding-point",
            setupFloat,
        },
        ...shape,
    });
};
const createScopedPoint = (attributes, type) => {
    const { X: longitude, Y: latitude, 标注名称: name, FID: id } = attributes;
    const shape = setupBillboardShape({
        longitude,
        latitude,
        image: ScopedPoint,
    });

    return new BillboardEntity({
        name,
        id,
        attr: {
            type,
            ...attributes,
            dialogName: "dialog-sponge-ponding-point-two",
            setupFloat,
        },
        ...shape,
    });
};
export default {
    name: "sponge-ponding-point",
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
            name: "SpongePondingPointLayer",
            zIndex: 1005,
        });
        const layerEnity = unref(gather).SpongePondingPointLayer;
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
            const { features: firstPonit } = await queryArcGIS(
                setupServiceID(HMCSITE_SERVICE, "0/query")
            );
            const { features: secondPonit } = await queryArcGIS(
                setupServiceID(HMCSITE_SERVICE, "1/query")
            );

            const points = consolidateData(firstPonit, secondPonit).map(
                setupConePoint(props.node)
            );
            return { points };
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