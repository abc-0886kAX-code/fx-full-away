<!--
 * @FilePath: \防汛大屏\src\pages\flash-flood-defense\components\flash-flood-defense-table\flash-flood-defense-table.vue
 * @Author: zhangyang
 * @Date: 2022-07-30 14:03:38
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-15 15:28:07
 * @Description: 
-->
<template>
    <div class="flash-flood-defense-table">
        <panel-table id="flash-flood-defense-table"></panel-table>
    </div>
</template>

<script>
import store from "@/stroe";
import { onMounted, onBeforeUnmount, unref } from "@vue/composition-api";
import { useTableData } from "@/biz/Table";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { setupPolylineImageShape } from "@/biz/Mars3D/usecase/usePolyline";
import useArcGISLine from "@/biz/ArcGIS/useLine";
import { getPGDefaultTableData } from "../../api/common";
import { default as PanelTable } from "@/components/panel-table";

import { DEFENSE_SERVICE } from "@/config/arcgis.conf";
import LineTarans from "@/assets/images/map/line-tarans.png";

const tableColumn = [
    {
        prop: "stnm",
        mold: "default",
        label: "名称",
        showOverflow: "title",
        align: "center"
    },
    {
        prop: "waringLabel",
        mold: "default",
        label: "是否报警",
        align: "center"
    }
];

function setupShapeEntity({ attributes }) {
    const { FID: id, ["名称"]: name } = attributes;
    return {
        id,
        name,
        attr: attributes
    };
}

function setupShapeStyle() {
    return setupPolylineImageShape({
        image: LineTarans,
        color: "rgba(0, 255, 255,1.0)",
        colorActive: "rgba(0, 255, 0,1.0)"
    });
}

export default {
    name: "flash-flood-defense-table",
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { PanelTable },
    setup() {
        const { mapview } = useMars3d();
        const { gather, setupLayer } = useLayer(mapview);
        const layer = setupLayer({
            type: "graphic",
            name: "DefenseLayer",
            zIndex: 1005
        });
        const layerEnity = unref(gather).DefenseLayer;
        const { setupShape } = useArcGISLine({
            ...layerEnity,
            service: DEFENSE_SERVICE,
            serviceID: 1,
            setupShapeEntity,
            setupShapeStyle
        });

        const { setupTableColumn, setupTableData, setupUiSchema } = useTableData("flash-flood-defense-table");
        setupTableColumn(tableColumn);
        setupUiSchema({
            isIndex: true,
            stripe: true
        });

        const executeQuery = async () => {
            // 打断之前的请求
            store.dispatch("_cancelTagRequest", "homeIndex");
            await setupTableData(getPGDefaultTableData());
        };

        onMounted(async () => {
            setupShape();
            await executeQuery();
        });

        onBeforeUnmount(() => {
            layer.remove();
        });

        return {};
    }
};
</script>
<style lang='scss' scoped>
@import "./flash-flood-defense-table.scss";
</style>
