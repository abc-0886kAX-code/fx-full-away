<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 14:45:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-14 17:18:35
 * @Description: 
-->
<template>
    <div class="real-time-monitor-default-map">
        <ytxd-tabs :active.sync="tabActive" :tabs="tabsMap"></ytxd-tabs>
        <component
            v-loading="loading"
            v-bind="loadStyle"
            :is="params.componentName"
            :info="params"
            @loadStart="loadStart"
            @loadEnd="loadEnd"
        ></component>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { useSocketMessage, SOCKET_MESSAGE_REALTIME } from "@/biz/Socket";
import { useTabs } from "@/composables/useTabs";
import { tabsInstall } from "./tabs-install";
import { onMounted, unref, computed } from "@vue/composition-api";

import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useLocation } from "@/biz/Mars3D/usecase/useLocation";
import { Load } from "@/biz/share/entify/Load";
import { getReservoirTabs } from "../../api/real-time-monitor.api";

export default {
    name: "real-time-monitor-default-map",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { ...tabsInstall },
    props: {},
    setup(props, context) {
        const { setupSocketMessage } = useSocketMessage();
        const { loading, loadStyle, setupLoading } = Load();
        const { mapview } = useMars3d();
        const { gather } = useLayer(mapview);
        const { clear } = useLocation(unref(gather).HomePointLayer);
        const { tabActive, tabsMap, setupTabActive, setupTabsMap } = useTabs(
            []
        );
        const params = computed(() => {
            const [first] = unref(tabsMap).filter(
                (item) => item.id === unref(tabActive)
            );

            return first ?? {};
        });

        const executeQuery = async () => {
            context.emit("loadStart");
            const data = await getReservoirTabs();
            const tabs = setupCurrentTabs(data);
            setupTabsMap(tabs);
            setupTabActive(tabs[0].id);
            context.emit("loadEnd");
            return { data };
        };

        function setupCurrentTabs(data) {
            return data.map((item) => {
                return {
                    id: item.stcd,
                    label: item.stnm,
                    stcd: item.stcd,
                    componentName: "basics-reservoir-tab",
                };
            });
        }

        const setupRealTimeRefresh = async () => {
            clear();
            await executeQuery();
            unref(mapview).flyToPoint([116.6753, 40.519], { radius: 540000 });
        };
        setupSocketMessage(SOCKET_MESSAGE_REALTIME, setupRealTimeRefresh);
        onMounted(async () => {
            clear();
            await executeQuery();
            unref(mapview).flyToPoint([116.6753, 40.519], { radius: 540000 });
        });

        const loadStart = () => {
            setupLoading(true);
        };

        const loadEnd = () => {
            setupLoading(false);
        };

        return {
            executeQuery,
            loading,
            loadEnd,
            loadStart,
            loadStyle,
            tabActive,
            tabsMap,
            params,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./real-time-monitor-default-map.scss";
</style>
