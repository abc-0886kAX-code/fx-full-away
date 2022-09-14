<!--
 * @Author: zhangxin
 * @Date: 2022-06-17 14:17:32
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-22 17:37:12
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

import { getPreventionMaterialList } from "../../api/pervention-material.api";

const tableColumn = [
    {
        prop: "stnm",
        mold: "default",
        label: "仓库名称",
        align: "left",
    },
    {
        prop: "area",
        mold: "default",
        label: "平谷区",
        align: "center",
        width: 90,
    },
    {
        prop: "lv",
        mold: "default",
        label: "级别",
        align: "center",
        width: 100,
    },
    {
        prop: "remark",
        mold: "default",
        label: "级别",
        align: "仓库信息",
        width: 100,
    },
    {
        prop: "dept",
        mold: "default",
        label: "仓库权属",
        align: "center",
        width: 100,
    },
    {
        prop: "groupname",
        mold: "default",
        label: "仓库单位",
        align: "center",
        width: 100,
    },
    {
        prop: "stlc",
        mold: "default",
        label: "仓库地址",
        align: "center",
        width: 100,
    },
    {
        prop: "structure",
        mold: "default",
        label: "仓库结构",
        align: "center",
        width: 100,
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
                    dialogName: "dialog-prevention-material-cbh",
                    setupFloat,
                },
                ...shape,
            });
        };

export default {
    name: "prevention-material",
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
            name: "PMCBHPointLayer",
            zIndex: 1005,
        });
        const layerEnity = unref(gather).PMCBHPointLayer;
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
            tag: "PreventionMaterial",
            executeQuery,
        });

        async function executeQuery() {
            const data = await getPreventionMaterialList();
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
