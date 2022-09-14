<!--
 * @FilePath: \3D防汛作战\src\pages\basin-flood\components\basin-jyh\components\basic-data-jyh\components\dike-danger-worker.vue
 * @Author: zhangyang
 * @Date: 2022-06-17 10:18:34
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-22 11:47:34
 * @Description: 提房险工
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

import { DANGER_WORKER_SERVICE } from "@/config/arcgis.conf";

const floatColumn = [
    {
        prop: "NAME",
        label: "名称",
    },
    {
        prop: "流域分布",
        label: "流域分布",
    },
    {
        prop: "风险等级",
        label: "风险等级",
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
            dialogName: "dialog-cbh-dike-danger-worker",
            setupFloat,
        }),
    };
}

function setupShapeStyle() {
    return setupLineFlowColorShape({
        color: "rgba(0, 255, 0,1.0)",
        colorActive: "rgba(0, 255, 255,1.0)"
    });
}

export default {
    name: "dike-danger-worker",
    mixins: [],
    components: {},
    props: {},
    render() {
        return {};
    },
    setup() {
        const { mapview } = useMars3d();
        const { gather, setupLayer } = useLayer(mapview);
        const layer = setupLayer({
            type: "graphic",
            name: "JYHDikeDangerWorkerLayer",
            zIndex: 1005,
        });
        const layerEnity = unref(gather).JYHDikeDangerWorkerLayer;

        const { setupShape } = useArcGISLine({
            ...layerEnity,
            service: DANGER_WORKER_SERVICE,
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
                size: { w: "40%", h: "40vh" },
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
<style lang='scss' scoped>
</style>
