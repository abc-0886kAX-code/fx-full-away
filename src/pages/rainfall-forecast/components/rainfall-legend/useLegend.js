/*
 * @Author: maggot-code
 * @Date: 2022-05-26 17:46:42
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-27 16:42:50
 * @Description: file content
 */
import { computed, ref, unref } from "@vue/composition-api";
import format from "date-fns/format";

function setupColorLegend(color, colorLabel) {
    return color.map((item, index) => {
        const [r, g, b] = item;
        return {
            color: `rgba(${r},${g},${b},1.0)`,
            label: colorLabel[index]
        }
    });
}

export function useLegend() {
    const updateDate = ref(format(Date.now(), "yyyy-MM-dd HH:mm:ss"));
    const label = ref("暂无标题");
    const colorTag = ref([]);

    const legendProps = computed(() => ({
        date: unref(updateDate),
        label: unref(label),
        color: unref(colorTag)
    }));

    const setupLegend = (result) => {
        const { color, colorLabel, date, title } = result;
        updateDate.value = date ?? format(Date.now(), "yyyy-MM-dd HH:mm:ss");
        label.value = title ?? "暂无标题";
        colorTag.value = setupColorLegend(color ?? [], colorLabel ?? []);
    }

    return {
        legendProps,
        setupLegend
    }
}
