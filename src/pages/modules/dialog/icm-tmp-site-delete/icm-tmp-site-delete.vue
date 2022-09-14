<!--
 * @FilePath: \3D防汛作战\src\pages\modules\dialog\icm-tmp-site-delete\icm-tmp-site-delete.vue
 * @Author: zhangyang
 * @Date: 2022-07-12 14:46:43
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-12 15:37:46
 * @Description: 
-->
<template>
    <el-result icon="warning" :title="resultTitle" :subTitle="resultSubTitle">
        <template slot="extra">
            <el-button type="danger" size="mini" plain @click="handlerDelete">确定</el-button>
            <el-button type="info" size="mini" plain @click="dialogClose">取消</el-button>
        </template>
    </el-result>
</template>

<script>
import { onMounted, inject, unref, computed } from "@vue/composition-api";

import { icmImportTemplateSiteDelete } from "@/api/icm/import.api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { Message } from "element-ui";
export default {
    name: 'icm-tmp-site-delete',
    mixins: [DialogContentMixins],
    components: {},
    props: {},
    setup(props) {
        const { dialogLoadStart, dialogLoadEnd, dialogClose, dialogSetupNoticeKey } = inject("icmSiteDialog");

        const resultTitle = computed(() => {
            const { tmptypelable, tmpname } = unref(props).info;
            return `${tmptypelable} ${tmpname} 站点删除警告`
        });
        const resultSubTitle = computed(() => {
            const { hnnm, addvcd, stnm } = unref(props).info;
            return `确定要删除 ${hnnm} ${addvcd} ${stnm} 站点吗`
        });

        onMounted(async () => {
            dialogLoadEnd();
        });

        return {
            resultTitle,
            resultSubTitle,
            tmpInfo: unref(props).info,
            dialogLoadStart,
            dialogLoadEnd,
            dialogClose,
            dialogSetupNoticeKey,
        }
    },
    // 方法集合
    methods: {
        templateDeleteSuccess(response) {
            Message({
                showClose: true,
                message: '删除成功',
                type: 'success'
            });
            this.dialogSetupNoticeKey();
            return response;
        },
        templateDeleteError(error) {
            console.log(error);
            Message({
                showClose: true,
                message: '删除失败',
                type: 'error'
            });
            return {}
        },
        handlerDelete() {
            this.dialogLoadStart();
            icmImportTemplateSiteDelete(this.tmpInfo)
                .then(this.templateDeleteSuccess)
                .catch(this.templateDeleteError)
                .finally(this.dialogClose);
        }
    }
};
</script>
<style lang='scss' scoped>
@import "./icm-tmp-site-delete.scss";
</style>
