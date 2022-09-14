<!--
 * @FilePath: \3D防汛作战\src\pages\basin-flood\components\basin-cbh\components\basic-data-cbh\components\dike-danger-worker.vue
 * @Author: zxh
 * @Date: 2022-06-17 10:18:34
 * @LastEditors: zxh
 * @LastEditTime: 2022-06-22 11:44:01
 * @Description: 河道断面
-->

<script>
import { EventType } from "mars3d";

import {
    inject,
    unref,
    onMounted,
    onBeforeUnmount,
} from "@vue/composition-api";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useMars3dEvent } from "@/biz/Mars3D/usecase/useMars3dEvent";
import { setupLineFlowColorShape } from "@/biz/Mars3D/usecase/usePolyline";
import useArcGISLine from "@/biz/ArcGIS/useLine";

import { RIVER_SECTION } from "@/config/arcgis.conf";

const floatColumn = [
    {
        prop: "NAME",
        label: "名称",
    },
];

const setupFloat = (target) => {
    const { attr } = target.graphic;

    return floatColumn.map((item) => {
        const { label, prop: field } = item;

        return {
            label,
            field,
            text: attr[field],
        };
    });
};

function setupShapeEntity({ attributes }) {
    const { Id: id, NAME: name } = attributes;
    return {
        id,
        name,
        attr: Object.assign(attributes, {
            dialogName: "dialog-cbh-river-section",
            setupFloat,
        }),
    };
}

function setupShapeStyle() {
    return setupLineFlowColorShape({
        color: "rgba(0, 255, 0,1.0)",
        colorActive: "rgba(0, 255, 255,1.0)",
    });
}

export default {
    name: "river-section",
    mixins: [],
    components: {},
    props: {},
    setup() {
        const { mapview } = useMars3d();
        const { gather, setupLayer } = useLayer(mapview);
        const layer = setupLayer({
            type: "graphic",
            name: "CBHDikeDangerWorkerLayer",
            zIndex: 1005,
        });
        const layerEnity = unref(gather).CBHDikeDangerWorkerLayer;

        const { setupShape } = useArcGISLine({
            ...layerEnity,
            service: RIVER_SECTION,
            serviceID: 0,
            setupShapeEntity,
            setupShapeStyle,
        });

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
                size: { w: "30%", h: "30vh" },
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

        onMounted(() => {
            setupBind(layer);
            setupShape();
        });

        onBeforeUnmount(() => {
            layer.remove();
        });

        return {};
    },
};
</script>
<style lang='scss' scoped></style>