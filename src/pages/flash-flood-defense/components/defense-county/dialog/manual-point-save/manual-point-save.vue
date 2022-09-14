<!--
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\dialog\manual-point-save\manual-point-save.vue
 * @Author: zhangyang
 * @Date: 2022-07-31 08:04:21
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-08 09:40:18
 * @Description: 
-->
<template>
    <div class="manual-point-save">
        <mg-form class="manual-point-save-form" ref="formRefs" :schema="formSchema" :job="{}">
            <template #form-button>
                <el-button plain type="primary" @click="handlerSave">提交</el-button>
                <el-button plain type="primary" @click="handlerReset">重置</el-button>
                <el-button plain type="danger" @click="handlerClear">删除</el-button>
            </template>
        </mg-form>
    </div>
</template>

<script>
import { inject, onMounted, unref, computed, ref } from "@vue/composition-api";
import { usePlainStringInput, usePlainNumberInput } from "@/composables/biz-search/useSearchInput";

import { getManualData, saveManualData, deleteManualData } from "../../biz/FloodWarn/api/common.api";
import { default as DialogContent } from "@/mixins/dialog-content.mixins";

export default {
    name: 'manual-point-save',
    mixins: [DialogContent],
    components: {},
    props: {},
    setup(props, context) {
        const { dialogSetupNoticeKey } = inject("dialog");
        const {
            plainNumberSchema: anHourSchema,
            plainNumberSetupValue: anHourSetupValue,
        } = usePlainNumberInput("1h", { column: 12, title: "1小时累计雨量", value: 0, min: 0 });
        const {
            plainNumberSchema: threeHoursSchema,
            plainNumberSetupValue: threeHoursSetupValue,
        } = usePlainNumberInput("3h", { column: 12, title: "3小时累计雨量", value: 0, min: 0 });
        const {
            plainNumberSchema: sixHoursSchema,
            plainNumberSetupValue: sixHoursSetupValue,
        } = usePlainNumberInput("6h", { column: 12, title: "6小时累计雨量", value: 0, min: 0 });
        const {
            plainNumberSchema: twelveHoursSchema,
            plainNumberSetupValue: twelveHoursSetupValue,
        } = usePlainNumberInput("12h", { column: 12, title: "12小时累计雨量", value: 0, min: 0 });
        const { plainStringSchema: lgtdSchema } = usePlainStringInput("lgtd", { column: 24, title: "经度", value: props.info.lng, disabled: true });
        const { plainStringSchema: lttdSchema } = usePlainStringInput("lttd", { column: 24, title: "纬度", value: props.info.lat, disabled: true });
        const formRefs = ref();
        const formSchema = computed(() => {
            return {
                formSchema: {
                    inline: false,
                    labelWidth: "140px",
                },
                cellSchema: [
                    unref(anHourSchema),
                    unref(threeHoursSchema),
                    unref(sixHoursSchema),
                    unref(twelveHoursSchema),
                    unref(lgtdSchema),
                    unref(lttdSchema),
                ]
            }
        });
        function handlerSave() {
            const { data } = unref(formRefs).formOutput();
            saveManualData(data).then(dialogSetupNoticeKey).finally(() => {
                context.emit("closeDialog")
            });
        }
        function handlerReset() {
            unref(formRefs).resetForm();
        }
        function handlerClear() {
            const { data } = unref(formRefs).formOutput();
            deleteManualData(data).then(dialogSetupNoticeKey).finally(() => {
                context.emit("closeDialog")
            });
        }

        onMounted(async () => {
            const { data } = unref(formRefs).formOutput();
            const [point] = await getManualData(data).finally(() => {
                context.emit("loadEnd")
            });
            if (point) {
                anHourSetupValue(point["1h"]);
                threeHoursSetupValue(point["3h"]);
                sixHoursSetupValue(point["6h"]);
                twelveHoursSetupValue(point["12h"]);
            }
        });

        return {
            formRefs,
            formSchema,
            handlerSave,
            handlerReset,
            handlerClear,
        }
    }
};
</script>
<style lang='scss' scoped>
@import "./manual-point-save.scss";
</style>
