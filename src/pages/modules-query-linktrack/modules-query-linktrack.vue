<!--
 * @FilePath: \3D防汛作战\src\pages\modules-query-linktrack\modules-query-linktrack.vue
 * @Author: zhangyang
 * @Date: 2022-06-29 10:19:24
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-04 15:18:09
 * @Description: 
-->
<template>
    <div class='modules-body modules-query-linktrack'>
        <mg-form class="modules-query-linktrack-search" ref="searchRefs" proName="/icm" :schema="searchFormSchema"
            :job="searchFormJob">
            <template #form-button>
                <el-button plain type="primary" @click="handlerSearch">查询</el-button>
            </template>
        </mg-form>
    </div>
</template>

<script>
import { nextTick, unref, computed, ref } from "@vue/composition-api";

import {
    setupNetworkDrivePlan,
    useNetworkQuery,
    useNetworkPlanQuery
} from "@/pages/modules/usercase/useNetworkQuery";
import { useRaineventQuery } from "@/pages/modules/usercase/useRaineventQuery";
import { useWaterlevelQuery } from "@/pages/modules/usercase/useWaterlevelQuery";
import { useTranstionQuery } from "@/pages/modules/usercase/useTranstionQuery";
import { usesUpperAndLowerBasins } from "@/composables/biz-search/useSearchSelect";
import { icmQueryModuleNetworkTrace } from "@/api/icm/query.api";

export default {
    name: 'modules-query-linktrack',
    mixins: [],
    components: {},
    props: {},
    setup() {
        const searchRefs = ref();
        const { networkSelectSchema } = useNetworkQuery("network", { driveField: "scenario", enumText: "name" });
        const { networkPlanSchema } = useNetworkPlanQuery("scenario");
        const { raineventSelectSchema } = useRaineventQuery("rainevent", { enumText: "name" });
        const { waterlevelSelectSchema } = useWaterlevelQuery("waterlevel", { enumText: "name" })
        const { transtionSelectSchema } = useTranstionQuery("transtion", { enumText: "name" })
        const { upperAndLowerSchema } = usesUpperAndLowerBasins("type");
        const searchFormSchema = computed(() => {
            return {
                formSchema: {
                    inline: true,
                    labelWidth: "0px",
                },
                cellSchema: [
                    unref(networkSelectSchema),
                    unref(networkPlanSchema),
                    unref(raineventSelectSchema),
                    unref(waterlevelSelectSchema),
                    unref(transtionSelectSchema),
                    unref(upperAndLowerSchema)
                ],
            }
        });
        const searchFormJob = {
            setupNetworkDrivePlan
        };

        async function handlerSearch() {
            await nextTick();
            const { data } = unref(searchRefs).formOutput();
            console.log(data);
            // const response = await icmQueryModuleNetworkTrace(data);
            // console.log(response);
        }

        return {
            searchRefs,
            searchFormSchema,
            searchFormJob,
            handlerSearch
        }
    }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/style/modules-body.scss";
@import "./modules-query-linktrack.scss";
</style>
