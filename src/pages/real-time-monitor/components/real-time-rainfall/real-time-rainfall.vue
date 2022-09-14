<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-25 11:04:28
 * @Description: 
-->
<template>
    <panel-table id="real-time-rainfall" @handleLink="handleLink"></panel-table>
</template>

<script>
import { useSocketMessage, SOCKET_MESSAGE_REALTIME } from "@/biz/Socket";
import { getRainTotalDataListt } from "../../api/real-time-monitor.api";
import store from "@/stroe";
import { unref, onMounted } from "@vue/composition-api";
import { graphic } from "mars3d";
import { useTableData } from "@/biz/Table";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useLocation } from "@/biz/Mars3D/usecase/useLocation";
import { default as PanelTable } from "@/components/panel-table";
import flagImg from "@/assets/icon/flag.png";
import yuliangImg from "@/assets/icon/ssjc-yuliang.png";
import { createLabel } from "@/biz/Mars3D/usecase/usePoint";
import { setupBillboardShape } from "@/biz/Mars3D/usecase/useBillboard";

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
        prop: "hourTime",
        mold: "default",
        label: "时间",
        align: "center",
        type: "html",
        width: 90
    },
    {
        prop: "r",
        mold: "default",
        label: "降雨量(mm)",
        align: "center",
        type: "html",
        width: 110
    }
];

const { BillboardEntity } = graphic;

const setupFloat = (target) => {
    const { attr } = target.graphic;
    return tableColumn.map((item) => {
        const { label, prop: field } = item;
        return {
            label,
            field,
            text: attr[field] ?? "--"
        };
    });
};
const setupPointLabel = (options, max) => {
    const { r } = options;

    if (!r || r < 0) return {};

    const text = createLabel([[r]]);

    return max
        ? {
              text,
              textColor: "#FFFFFF",
              textBgColor: "#F56C6C",
              useBgColor: true
          }
        : { text };
};
const setupConePoint = (source, index) => {
    const { lgtd: longitude, lttd: latitude, stnm: name, stcd: id, r, offsetx, offsety } = source;
    // 取排序第一个值，并且有降雨量存在
    const max = index <= 0 && r > 0;
    const label = setupPointLabel({ r }, max);
    const shape = setupBillboardShape({
        longitude,
        latitude,
        image: max ? flagImg : yuliangImg,
        offsetx,
        offsety: offsety ?? -32,
        ...label
    });

    return new BillboardEntity({
        name,
        id,
        attr: {
            ...source,
            dialogName: "dialog-real-time-rainfall",
            setupFloat
        },
        ...shape
    });
};

export default {
    name: "real-time-rainfall",
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

        const { setupTableColumn, setupTableData, setupUiSchema } = useTableData("real-time-rainfall");
        setupTableColumn(tableColumn);

        setupUiSchema({
            isIndex: true,
            stripe: true
        });

        const executeQuery = async () => {
            // 打断之前的请求
            store.dispatch("_cancelTagRequest", "homeIndex");
            const data = await setupTableData(getRainTotalDataListt({}));
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
@import "./real-time-rainfall.scss";
</style>
