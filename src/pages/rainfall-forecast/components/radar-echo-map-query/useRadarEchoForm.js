/*
 * @Author: zhangxin
 * @Date: 2022-07-07 11:27:06
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-07 11:55:08
 * @Description: 
 */
import { useVerificationLock } from "@/composables/biz-search/useSearch";
import { useStartOrEndDate } from "@/composables/biz-search/useSearchDate";
import { computed, ref, unref } from '@vue/composition-api';
export function useDatePickForm() {
    const searchRefs = ref();

    const startOrEndRequired = useVerificationLock("请选择日期区间", true);
    const { startOrEndSchema, setupAnalysisValue } = useStartOrEndDate(['starttime', 'endtime'], {
        column: 12,
        title: "",
        future: true,
        rule: [startOrEndRequired],
        range: 3
    });

    const searchFormSchema = computed(() => {
        return {
            formSchema: {
                inline: true,
                labelWidth: "0px",
            },
            cellSchema: [
                unref(startOrEndSchema),
            ]
        }
    })

    const searchFormJob = {};

    return {
        searchFormSchema,
        searchRefs,
        setupAnalysisValue,
        searchFormJob
    }
}

