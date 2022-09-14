<!--
 * @FilePath: \3D防汛作战\src\pages\basin-flood\components\basin-cbh\components\basic-data-cbh\components\flood-control-plug.vue
 * @Author: zhangyang
 * @Date: 2022-06-17 10:18:28
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-15 13:13:39
 * @Description: 防洪堵口
-->
<script>
import { cacheGet } from "maggot-utils";
import { EventType, graphic } from "mars3d";

import { inject, unref, computed, onMounted, onBeforeUnmount } from "@vue/composition-api";

import { default as useWebBasicData } from "@/biz/BasicData/useWebBasicData";

import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useLocation } from "@/biz/Mars3D/usecase/useLocation";
import { useMars3dEvent } from "@/biz/Mars3D/usecase/useMars3dEvent";
import { setupBillboardShape } from "@/biz/Mars3D/usecase/useBillboard";

import { getFloodControlPlugList } from "../api/flood-control-plug.api";

const floatColumn = [
    {
        prop: "stnm",
        label: "站点名称",
    },
    {
        prop: "areaname",
        label: "区域",
    },
];

const { BillboardEntity } = graphic;

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

const setupConePoint = ({ legend }) => (source) => {
    const { lgtd: longitude, lttd: latitude, stnm: name, code: id } = source;
    const shape = setupBillboardShape({
        longitude,
        latitude,
        image: legend
    });

    return new BillboardEntity({
        name,
        id,
        attr: {
            ...source,
            dialogName: "dialog-cbh-flood-control-plug",
            setupFloat,
        },
        ...shape,
    });
};

export default {
    name: "flood-control-plug",
    mixins: [],
    components: {},
    props: {
        node: Object
    },
    render() {
        return {};
    },
    setup(props) {
        const { mapview } = useMars3d();
        const { gather, setupLayer } = useLayer(mapview);
        const layer = setupLayer({
            type: "graphic",
            name: "CBHFloodControlPlugLayer",
            zIndex: 1005
        });
        const layerEnity = unref(gather).CBHFloodControlPlugLayer;
        const layerTarget = useLocation(layerEnity);

        const params = computed(() => {
            const addvcd = cacheGet("addvcd");
            const data = {
                addvcd: ""
            };
            if (addvcd) data.addvcd = addvcd;
            return data;
        });

        const { dialogHandler } = inject("dialog");
        const { setupFloatHide, setupFloatWindow } = inject("float");

        const handlerClick = (target) => {
            const { graphic } = target;
            const { attr: props, name: title } = graphic;
            const { dialogName: name } = props;

            setupFloatHide();
            dialogHandler({
                title, props, name,
                size: { w: '30%', h: '30vh' }
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
            const data = await getFloodControlPlugList(unref(params));
            const points = data.map(setupConePoint(props.node));
            return { data, points };
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
