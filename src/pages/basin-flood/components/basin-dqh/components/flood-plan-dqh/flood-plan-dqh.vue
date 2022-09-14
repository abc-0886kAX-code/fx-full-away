<!--
 * @Author: zhangxin
 * @Date: 2022-06-15 13:16:09
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-30 17:38:01
 * @Description: 
-->
<template>
    <div class="flood-plan-dqh reservoirBtn">
        <template v-for="item in basisList">
            <button :key="item.stcd" @click="location(item.stcd)">
                {{ item.stnm }}
            </button>
        </template>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { unref, onMounted, ref, onBeforeUnmount } from "@vue/composition-api";
import { graphic } from "mars3d";
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useLocation } from "@/biz/Mars3D/usecase/useLocation";
import { setupBillboardShape } from "@/biz/Mars3D/usecase/useBillboard";
import { getReservoirSiteByUser } from "../../api";
import shuiku from "@/assets/icon/ssjc-shuiku.png";

const { BillboardEntity } = graphic;

const tableColumn = [
    {
        label: "水库名称",
        field: "stnm",
    },
    {
        label: "地址",
        field: "address",
    },
];

const setupFloat = (target) => {
    const { attr } = target.graphic;
    return tableColumn.map((item) => {
        const { label, field } = item;
        return {
            label,
            field,
            text: attr[field] ?? "--",
        };
    });
};
const setupRoundPoint = (source) => {
    const { lgtd: longitude, lttd: latitude, stnm: name, stcd: id } = source;

    const shape = setupBillboardShape({
        longitude,
        latitude,
        image: shuiku,
    });

    return new BillboardEntity({
        name,
        id,
        attr: {
            ...source,
            dialogName: "dialog-flood-plan-dqh",
            setupFloat,
        },
        ...shape,
    });
};

export default {
    name: "flood-plan-dqh",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    setup() {
        const basisList = ref([]);
        const { mapview } = useMars3d();
        const { gather } = useLayer(mapview);
        const { find, clear, lockPosition } = useLocation(
            unref(gather).HomePointLayer
        );

        const layer = find();

        const executeQuery = async () => {
            const data = await getReservoirSiteByUser({ hnnm: "ACB12006" });
            basisList.value = data;
            const points = data.map(setupRoundPoint);
            clear();
            layer.addGraphic(points);
            layer.flyTo();
            return { data, points };
        };

        const location = (id) => {
            lockPosition(id);
        };

        onMounted(async () => {
            await executeQuery();
        });

        onBeforeUnmount(() => {
            clear();
        });

        return {
            basisList,
            location,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./flood-plan-dqh.scss";
@import "@/assets/style/basin-reservoir.scss";
</style>