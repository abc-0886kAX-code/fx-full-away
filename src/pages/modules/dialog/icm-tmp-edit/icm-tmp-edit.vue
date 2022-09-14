<!--
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-tmp-edit\icm-tmp-edit.vue
 * @Author: zhangyang
 * @Date: 2022-07-07 11:00:56
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-12 09:52:09
 * @Description: 
-->
<template>
    <div class='icm-tmp-edit'>
        <modules-import-tmp-details v-if="tmpInfo.status" :tmpInfo="tmpInfo" @onSave="handlerSave">
        </modules-import-tmp-details>
        <ytxd-empty v-else></ytxd-empty>
    </div>
</template>

<script>
import { onMounted, inject, unref, reactive } from "@vue/composition-api";

import ModulesImportTmpDetails from "@/pages/modules-import-template/component/modules-import-tmp-details.vue";

import { getTemplateInfo, icmImportTemplateEdit } from "@/api/icm/import.api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { Message } from "element-ui";
export default {
    name: 'icm-tmp-edit',
    mixins: [DialogContentMixins],
    components: {
        ModulesImportTmpDetails
    },
    props: {},
    setup(props) {
        const { dialogLoadStart, dialogLoadEnd, dialogClose, dialogSetupNoticeKey } = inject("dialog");

        const tmpInfo = reactive({
            status: false,
            times: "",
            tmpid: "",
            tmpname: "",
            tmptype: "",
            tmpind: 0,
            tmppath: ""
        });

        function setupBodyData(response) {
            if (!response) {
                dialogLoadEnd();
                return {
                    source: {},
                    data: unref(tmpInfo)
                }
            }

            const { times, tmpid, tmpname, tmptype, tmpind, tmppath } = response;
            tmpInfo.times = times ?? "";
            tmpInfo.tmpid = tmpid ?? "";
            tmpInfo.tmpname = tmpname ?? "";
            tmpInfo.tmptype = tmptype ?? "";
            tmpInfo.tmpind = tmpind ?? 0;
            tmpInfo.tmppath = tmppath ?? "";
            tmpInfo.status = true;
            dialogLoadEnd();

            return {
                source: response,
                data: unref(tmpInfo)
            };
        }

        onMounted(async () => {
            dialogLoadStart();
            tmpInfo.status = false;
            const [response] = await getTemplateInfo(unref(props).info);
            setupBodyData(response);
        });

        return {
            tmpInfo,
            dialogLoadStart,
            dialogLoadEnd,
            dialogClose,
            dialogSetupNoticeKey
        }
    },
    //方法集合
    methods: {
        templateEditSuccess(response) {
            Message({
                showClose: true,
                message: '修改成功',
                type: 'success'
            });
            this.dialogClose();
            this.dialogSetupNoticeKey();
            return response;
        },
        templateEditError(error) {
            console.log(error);
            Message({
                showClose: true,
                message: '修改失败',
                type: 'error'
            });
            return {}
        },
        handlerSave(data) {
            this.dialogLoadStart();
            const body = Object.assign({}, this.tmpInfo, data);
            icmImportTemplateEdit(body)
                .then(this.templateEditSuccess)
                .catch(this.templateEditError)
                .finally(this.dialogLoadEnd);
        }
    },
};
</script>
<style lang='scss' scoped>
@import "./icm-tmp-edit.scss";
</style>
