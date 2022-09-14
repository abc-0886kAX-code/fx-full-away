import { unref, computed, ref } from "@vue/composition-api";

import { Load } from "@/biz/share/entify/Load";
import {
    setupNetworkDrivePlan,
    useNetworkQuery,
    useNetworkPlanQuery
} from "@/pages/modules/usercase/useNetworkQuery";
import { useTemplateQuery } from "@/pages/modules/usercase/useTemplateQuery";
import { useRaineventQuery } from "@/pages/modules/usercase/useRaineventQuery";
import { useWaterlevelQuery } from "@/pages/modules/usercase/useWaterlevelQuery";
import { useInflowQuery } from "@/pages/modules/usercase/useInflowQuery";
import { useTranstionQuery } from "@/pages/modules/usercase/useTranstionQuery";
import { useStartOrEndDate } from "@/composables/biz-search/useSearchDate";
import { useWhetherOrNot } from "@/composables/biz-search/useSearchSelect";
import { usePlainStringInput, usePlainNumberInput } from "@/composables/biz-search/useSearchInput";
import { useVerificationLock } from "@/composables/biz-search/useSearch";

export function useImitateForm() {
    const { loading: searchVisable, setupLoading: setupSearchVisable } = Load();
    const searchRefs = ref();

    const runNameRequired = useVerificationLock("请输入运行名称", true);
    const {
        plainStringSchema: runNameSchema
    } = usePlainStringInput("runName", {
        column: 12,
        title: "运行名称",
        tips: "请输入运行名称",
        rule: [runNameRequired]
    });
    const startOrEndRequired = useVerificationLock("请选择日期区间", true);
    const { startOrEndSchema, setupAnalysisValue } = useStartOrEndDate(['startTime', 'endTime'], {
        column: 24,
        title: "日期区间",
        future: true,
        rule: [startOrEndRequired]
    });

    const networkRequired = useVerificationLock("请选择模型网络", true);
    const { networkSelectSchema, networkSelectEnumSetup } = useNetworkQuery("network", {
        column: 24,
        title: "模型网络",
        driveField: "scenarioName",
        enumText: "name",
        rule: [networkRequired]
    });
    const networkPlanRequired = useVerificationLock("请选择模型网络方案", true);
    const { networkPlanSchema } = useNetworkPlanQuery("scenarioName", {
        column: 24,
        title: "模型网络方案",
        rule: [networkPlanRequired]
    });
    const templateRequired = useVerificationLock("请选择运行模板", true);
    const { templateSelectSchema, templateSelectEnumSetup } = useTemplateQuery("template", {
        column: 24,
        title: "运行模板",
        driveField: "scenarioName",
        enumText: "name",
        rule: [templateRequired]
    });

    const { raineventSelectSchema, raineventSelectEnumSetup } = useRaineventQuery("rainevent", {
        column: 24,
        title: "降雨事件",
        enumText: "name",
    });
    const { waterlevelSelectSchema, waterlevelSelectEnumSetup } = useWaterlevelQuery("waterlevel", {
        column: 24,
        title: "水位事件",
        enumText: "name",
    });
    const { inflowSelectSchema, inflowSelectEnumSetup } = useInflowQuery("inflowevent", {
        column: 24,
        title: "入流事件",
        enumText: "name",
    });
    const { transtionSelectSchema, transtionSelectEnumSetup } = useTranstionQuery("transtion", {
        column: 24,
        title: "调节器事件",
        enumText: "name",
    });

    const { whetherOrNotSchema } = useWhetherOrNot("endDuration", {
        column: 24,
        title: "是否是特定时长",
        tips: "请选择是否是特定时长",
        leader: {
            "setupUsableDuration.duration": {
                controller: "uiSchema.disabled"
            }
        }
    });
    const { plainNumberSchema: durationSchema } = usePlainNumberInput("duration", { column: 24, title: "时长", value: 10, min: 10, worker: ["setupUsableDuration.duration"] });
    const { plainNumberSchema: resultsMultiplierSchema } = usePlainNumberInput("resultsMultiplier", { column: 24, title: "乘子", value: 5 });
    const { plainNumberSchema: timeStepSchema } = usePlainNumberInput("timeStep", { column: 24, title: "计算步长", value: 1 });

    const searchFormSchema = computed(() => {
        return {
            formSchema: {
                inline: false,
                labelWidth: "160px",
            },
            cellSchema: [
                unref(runNameSchema),
                unref(startOrEndSchema),

                unref(networkSelectSchema),
                unref(networkPlanSchema),
                unref(templateSelectSchema),

                unref(raineventSelectSchema),
                unref(waterlevelSelectSchema),
                unref(inflowSelectSchema),
                unref(transtionSelectSchema),

                unref(whetherOrNotSchema),
                unref(durationSchema),
                unref(resultsMultiplierSchema),
                unref(timeStepSchema),
            ],
        }
    });
    const searchFormJob = {
        setupNetworkDrivePlan,
        setupUsableDuration
    };

    async function setupUsableDuration(result) {
        const { value } = result;
        return value;
    }

    function setupInstallEnums() {
        return Promise.allSettled([
            networkSelectEnumSetup(),
            templateSelectEnumSetup(),
            raineventSelectEnumSetup(),
            waterlevelSelectEnumSetup(),
            inflowSelectEnumSetup(),
            transtionSelectEnumSetup(),
        ]);
    }

    return {
        searchVisable,
        setupSearchVisable,
        searchRefs,
        searchFormSchema,
        searchFormJob,
        setupInstallEnums,
        setupAnalysisValue
    }
}
