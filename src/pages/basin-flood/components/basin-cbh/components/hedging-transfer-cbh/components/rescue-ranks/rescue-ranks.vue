<!--
 * @Author: zhangxin
 * @Date: 2022-06-17 14:17:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-22 15:51:02
 * @Description: 
-->
<script>
import { EventType, graphic } from "mars3d";
import {
    inject,
    unref,
    onMounted,
    onBeforeUnmount,
} from "@vue/composition-api";

import { default as useWebBasicData } from "@/biz/BasicData/useWebBasicData";

import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useLocation } from "@/biz/Mars3D/usecase/useLocation";
import { setupBillboardShape } from "@/biz/Mars3D/usecase/useBillboard";
import { useMars3dEvent } from "@/biz/Mars3D/usecase/useMars3dEvent";

import { getRescueRanksList } from "../../api/pervention-material.api";

const tableColumn = [
    {
        field: "name",
        label: "名称",
    },
    {
        field: "captain",
        label: "队长",
    },
    {
        field: "dept",
        label: "部门",
    },
    {
        field: "duty",
        label: "职责",
    },
    {
        field: "location",
        label: "地点",
    },
    {
        field: "tel1",
        label: "联系方式",
    },
];
const { BillboardEntity } = graphic;

const setupFloat = (target) => {
    const { attr } = target.graphic;
    return tableColumn.map((item) => {
        const { label, field } = item;

        return {
            label,
            field,
            text: attr[field],
        };
    });
};

const setupConePoint =
    ({ legend }) =>
        (source) => {
            const {
                lgtd: longitude,
                lttd: latitude,
                stnm: name,
                stcd: id,
            } = source;

            const shape = setupBillboardShape({
                longitude,
                latitude,
                image: legend,
            });

            return new BillboardEntity({
                name,
                id,
                attr: {
                    ...source,
                    dialogName: "dialog-rescue-ranks-cbh",
                    setupFloat,
                },
                ...shape,
            });
        };

export default {
    name: "rescue-ranks",
    mixins: [],
    components: {},
    props: {
        node: Object,
    },
    render() {
        return {};
    },
    setup(props) {
        const { mapview } = useMars3d();
        const { gather, setupLayer } = useLayer(mapview);
        const layer = setupLayer({
            type: "graphic",
            name: "RRCBHPointLayer",
            zIndex: 1005,
        });
        const layerEnity = unref(gather).RRCBHPointLayer;
        const layerTarget = useLocation(layerEnity);

        const { dialogHandler } = inject("dialog");
        const { setupFloatHide, setupFloatWindow } = inject("float");

        const handlerClick = (target) => {
            const { graphic } = target;
            const { attr: props, name: title } = graphic;
            const { dialogName: name } = props;

            setupFloatHide();
            dialogHandler({ title, props, name });
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
            tag: "RescueRanks",
            executeQuery,
        });

        async function executeQuery() {
            const data = await getRescueRanksList();
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
