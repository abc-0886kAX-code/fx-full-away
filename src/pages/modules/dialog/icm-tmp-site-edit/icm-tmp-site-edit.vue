<!--
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-tmp-site-edit\icm-tmp-site-edit.vue
 * @Author: zhangyang
 * @Date: 2022-07-12 10:49:54
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-12 14:23:56
 * @Description: 
-->
<template>
    <div class='icm-tmp-site-edit'>
        <modules-import-tmp-site-details :tmpInfo="tmpInfo" @onSave="handlerSave">
        </modules-import-tmp-site-details>
    </div>
</template>

<script>
import { inject, unref } from "@vue/composition-api";

import ModulesImportTmpSiteDetails from "@/pages/modules-import-template/component/modules-import-tmp-site-details.vue";

import { icmImportTemplateSiteEdit } from "@/api/icm/import.api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { Message } from "element-ui";
export default {
    name: 'icm-tmp-site-edit',
    mixins: [DialogContentMixins],
    components: {
        ModulesImportTmpSiteDetails
    },
    props: {},
    setup(props) {
        const { dialogLoadStart, dialogLoadEnd, dialogClose, dialogSetupNoticeKey } = inject("icmSiteDialog");

        return {
            tmpInfo: unref(props).info,
            dialogLoadStart,
            dialogLoadEnd,
            dialogClose,
            dialogSetupNoticeKey
        }
    },
    // 方法集合
    methods: {
        siteEditSuccess(response) {
            Message({
                showClose: true,
                message: '修改成功',
                type: 'success'
            });
            this.dialogClose();
            this.dialogSetupNoticeKey();
            return response;
        },
        siteEditError(error) {
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

            icmImportTemplateSiteEdit(body)
                .then(this.siteAddSuccess)
                .catch(this.siteAddError)
                .finally(this.dialogLoadEnd);
        }
    }
};
</script>
<style lang='scss' scoped>
@import "./icm-tmp-site-edit.scss";
</style>
