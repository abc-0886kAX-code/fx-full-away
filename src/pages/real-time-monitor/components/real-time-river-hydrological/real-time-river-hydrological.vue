<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-25 11:09:10
 * @Description: 
-->
<template>
    <panel-table id="real-time-river-hydrological" @handleLink="handleLink"></panel-table>
</template>

<script>
import { useSocketMessage, SOCKET_MESSAGE_REALTIME } from "@/biz/Socket";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useLocation } from "@/biz/Mars3D/usecase/useLocation";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useTableData } from "@/biz/Table";
import { default as PanelTable } from "@/components/panel-table";
import store from "@/stroe";
import { onMounted, unref } from "@vue/composition-api";
import { graphic } from "mars3d";
import { getRiverNewDataList } from "../../api/real-time-monitor.api";

import hedao from "@/assets/icon/ssjc-hedao.png";
import { setupBillboardShape } from "@/biz/Mars3D/usecase/useBillboard";
import { createLabel } from "@/biz/Mars3D/usecase/usePoint";
import { filterTrendStatus } from "@/utils/business";

const tableColumn = [
    {
        prop: "stnm",
        formatLink: "location",
        mold: "link",
        label: "站名",
        showOverflow: "title",
        align: "left"
    },
    {
        prop: "differWarning",
        mold: "default",
        formatNumber: "toFixed.2",
        type: "html",
        label: "比警戒",
        align: "center",
        width: 70
    },
    {
        prop: "hourTimeWarning",
        mold: "default",
        label: "时间",
        type: "html",
        align: "center",
        width: 60
    },
    {
        prop: "rzAndTrendWarning",
        mold: "default",
        formatNumber: "toFixed.2",
        label: "水位(m)",
        type: "html",
        align: "center",
        width: 90
    },
    {
        prop: "qWarning",
        mold: "default",
        formatNumber: "toFixed.2",
        label: "流量",
        type: "html",
        align: "center",
        width: 70
    }
];

const conversion = [
    {
        field: "stnm",
        label: "站点名称"
    },
    {
        field: "trend",
        label: "趋势"
    },
    {
        field: "differwarn",
        label: "比警戒"
    },
    {
        field: "hourTime",
        label: "时间"
    },
    {
        field: "z",
        label: "水位(m)"
    },
    {
        field: "q",
        label: "流量"
    }
];

const { BillboardEntity } = graphic;
const setupFloat = (target) => {
    const { attr } = target.graphic;
    return conversion.map((item) => {
        const { label, field } = item;
        if (field === "trend") {
            return {
                label,
                field,
                ...filterTrendStatus(attr[field], true)
            };
        }
        return {
            label,
            field,
            text: attr[field] ?? "--"
        };
    });
};
const setupPointLabel = (options) => {
    const { differwarn, iswarn } = options;

    if (!iswarn || differwarn < 0) return {};

    const text = createLabel([[differwarn]]);

    return {
        text
    };
};
const setupConePoint = (source) => {
    const { lgtd: longitude, lttd: latitude, stnm: name, stcd: id, differwarn, iswarn, offsetx, offsety } = source;
    const label = setupPointLabel({ differwarn, iswarn });
    const shape = setupBillboardShape({
        longitude,
        latitude,
        image: hedao,
        offsetx,
        offsety: offsety ?? -32,
        ...label
    });

    return new BillboardEntity({
        name,
        id,
        attr: {
            ...source,
            dialogName: "dialog-real-time-river-hydrological",
            setupFloat
        },
        ...shape
    });
};

export default {
    name: "real-time-river-hydrological",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { PanelTable },
    props: {},
    setup() {
        const { setupSocketMessage } = useSocketMessage();
        const { mapview } = useMars3d();
        const { gather } = useLayer(mapview);
        const { find, clear, lockPosition } = useLocation(unref(gather).HomePointLayer);
        const layer = find();

        const { setupTableColumn, setupTableData, setupUiSchema } = useTableData("real-time-river-hydrological");
        setupTableColumn(tableColumn);

        setupUiSchema({
            isIndex: true,
            stripe: true
        });

        const executeQuery = async () => {
            // 打断之前的请求
            store.dispatch("_cancelTagRequest", "homeIndex");
            const data = await setupTableData(getRiverNewDataList({}));
            const points = data.map(setupConePoint);
            clear();
            layer.addGraphic(points);
            layer.flyTo();
            return { data, points };
        };
        const handleLink = ({ row }) => {
            const { stcd } = row;
            lockPosition(stcd);
        };
        setupSocketMessage(SOCKET_MESSAGE_REALTIME, executeQuery);
        onMounted(async () => {
            await executeQuery();
        });

        return { handleLink };
    }
};
</script>
<style lang='scss' scoped>
@import "./real-time-river-hydrological.scss";
</style>
