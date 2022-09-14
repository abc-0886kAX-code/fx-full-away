<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-15 15:26:49
 * @Description: 
-->
<template>
    <panel-table id="real-time-video-surveillance" @handleLink="handleLink"></panel-table>
</template>

<script>
import { useSocketMessage, SOCKET_MESSAGE_REALTIME } from "@/biz/Socket";
import { getMFRVList } from "../../api/real-time-monitor.api";

import store from "@/stroe";
import { unref, computed, onMounted } from "@vue/composition-api";
import { graphic } from "mars3d";
import { useTableData } from "@/biz/Table";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useLocation } from "@/biz/Mars3D/usecase/useLocation";
import { setupBillboardShape } from "@/biz/Mars3D/usecase/useBillboard";
import { default as PanelTable } from "@/components/panel-table";
import shexiangtou from "@/assets/icon/shexiangtou.png";

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
        prop: "areaname",
        mold: "default",
        label: "区名",
        align: "center",
        width: 80
    },
    {
        prop: "township",
        mold: "default",
        label: "乡镇",
        align: "center",
        width: 80
    },
    {
        prop: "village",
        mold: "default",
        label: "村名",
        align: "center",
        width: 70
    },
    {
        prop: "threats",
        mold: "default",
        label: "人数",
        align: "center",
        width: 70
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
const setupRoundPoint = (source) => {
    const { lgtd: longitude, lttd: latitude, stnm: name, stcd: id } = source;

    const shape = setupBillboardShape({
        longitude,
        latitude,
        image: shexiangtou
    });

    return new BillboardEntity({
        name,
        id,
        attr: {
            ...source,
            dialogName: "dialog-real-time-video-surveillance",
            setupFloat
        },
        ...shape
    });
};

export default {
    name: "real-time-video-surveillance",
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

        const { setupTableColumn, setupTableData, setupUiSchema } = useTableData("real-time-video-surveillance");
        setupTableColumn(tableColumn);
        setupUiSchema({
            isIndex: true,
            stripe: true
        });

        const executeQuery = async () => {
            // 打断之前的请求
            store.dispatch("_cancelTagRequest", "homeIndex");
            const data = await setupTableData(getMFRVList());
            const points = data.map(setupRoundPoint);
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
@import "./real-time-video-surveillance.scss";
</style>
