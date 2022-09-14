<!--
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-tmp-add\icm-tmp-add.vue
 * @Author: zhangyang
 * @Date: 2022-07-11 11:35:46
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-11 13:35:19
 * @Description: 
-->
<template>
    <div class='icm-tmp-add'>
        <modules-import-tmp-details :tmpInfo="tmpInfo" @onSave="handlerSave">
        </modules-import-tmp-details>
    </div>
</template>

<script>
import { onMounted, inject, reactive } from "@vue/composition-api";

import ModulesImportTmpDetails from "@/pages/modules-import-template/component/modules-import-tmp-details.vue";

import { icmImportTemplateAdd } from "@/api/icm/import.api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { Message } from "element-ui";
export default {
    name: 'icm-tmp-add',
    mixins: [DialogContentMixins],
    components: {
        ModulesImportTmpDetails
    },
    props: {},
    setup() {
        const { dialogLoadStart, dialogLoadEnd, dialogClose, dialogSetupNoticeKey } = inject("dialog");
        const tmpInfo = reactive({
            times: "",
            tmpid: "",
            tmpname: "",
            tmptype: "",
            tmpind: 0,
            tmppath: ""
        });

        onMounted(async () => {
            dialogLoadEnd();
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
        templateAddSuccess(response) {
            Message({
                showClose: true,
                message: '新增成功',
                type: 'success'
            });
            this.dialogClose();
            this.dialogSetupNoticeKey();
            return response;
        },
        templateAddError(error) {
            console.log(error);
            Message({
                showClose: true,
                message: '新增失败',
                type: 'error'
            });
            return {}
        },
        handlerSave(data) {
            this.dialogLoadStart();
            const body = Object.assign({}, this.tmpInfo, data);
            icmImportTemplateAdd(body)
                .then(this.templateAddSuccess)
                .catch(this.templateAddError)
                .finally(this.dialogLoadEnd);
        }
    },
};
</script>
<style lang='scss' scoped>
@import "./icm-tmp-add.scss";
</style>
