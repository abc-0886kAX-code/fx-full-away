<!--
 * @FilePath: \3D防汛作战\src\pages\basin-flood\components\basin-jyh\components\basic-data-jyh\components\reservoir.vue
 * @Author: zhangyang
 * @Date: 2022-06-17 10:18:51
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-22 11:47:55
 * @Description: 水库
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
import { setupWaterShape } from "@/biz/Mars3D/usecase/useWater";
import useArcGISPlane from "@/biz/ArcGIS/usePlane";

import { RESERVOIR_SERVICE } from "@/config/arcgis.conf";
import WaterNormals from "@/assets/images/map/waterNormals.jpg";

const floatColumn = [
    {
        prop: "NAME",
        label: "水库名称",
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
    const { ID: id, NAME: name } = attributes;
    return {
        id,
        name,
        attr: Object.assign(attributes, {
            dialogName: "dialog-cbh-reservoir",
            setupFloat,
        }),
    };
}

function setupShapeStyle() {
    return setupWaterShape({
        normalMap: WaterNormals,
        color: "rgba(0, 255, 255,1.0)",
        colorActive: "rgba(0, 255, 0,1.0)",
    });
}

export default {
    name: "reservoir",
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
            name: "JYHReservoirLayer",
            zIndex: 1005,
        });
        const layerEnity = unref(gather).JYHReservoirLayer;

        const { setupShape } = useArcGISPlane({
            ...layerEnity,
            service: RESERVOIR_SERVICE,
            serviceID: 3,
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
