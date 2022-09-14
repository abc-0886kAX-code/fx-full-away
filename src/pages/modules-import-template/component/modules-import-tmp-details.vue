<!--
 * @FilePath: \3D防汛作战\src\pages\modules-import-template\component\modules-import-tmp-details.vue
 * @Author: zhangyang
 * @Date: 2022-07-07 11:06:52
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-12 09:54:31
 * @Description: 
-->
<template>
    <el-form class='modules-import-tmp-details' :model="formData" :rules="formRules" ref="formRefs" size="mini"
        label-width="80px">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="模板名称" prop="tmpname">
                    <el-input v-model="formData.tmpname" :clearable="true" placeholder="请填写模板名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="模板排序" prop="tmpind">
                    <el-input-number v-model="formData.tmpind" :min="0">
                    </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="模板类型" prop="tmptype">
                    <el-select v-model="formData.tmptype" :clearable="true" placeholder="请选择模板类型">
                        <template v-for="item in templateType">
                            <el-option :key="item.code" :label="item.description" :value="item.code"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="模板文件">
                    <el-upload ref="uploadRefs" action="#" :limit="1" :file-list="formFile" :multiple="false"
                        :show-file-list="true" :auto-upload="false" :http-request="setupHttpRequest"
                        :on-remove="fileOnRemove" :on-change="fileOnChange" :on-preview="fileOnPreview"
                        :on-exceed="fileOnExceed" :before-upload="fileBeforeUpload">
                        <el-button slot="trigger" size="mini" type="primary">选取模板文件</el-button>
                    </el-upload>
                    <p class="defailt-file-tips" :class="formFileTipsClass">{{ formFileTips }}</p>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item>
            <el-button type="primary" plain @click="handlerEdit">提交</el-button>
            <el-button type="danger" plain @click="handlerReset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { onMounted, unref, computed, shallowRef, reactive, ref } from "@vue/composition-api";
import { Load } from "@/biz/share/entify/Load";
import { fileUpload } from "@/api/common.api";
import { remove, isFunction, isString } from "lodash";
import { icmTemplateTypeGet } from "@/api/common.api";

function hasFileUsable(url) {
    return isString(url) && url.length > 0;
}
function setupFileFormat(url = "") {
    const name = url.split("/").at(-1);
    return { name, url, usable: hasFileUsable(url) };
}
export default {
    name: 'modules-import-tmp-details',
    mixins: [],
    components: {},
    props: {
        tmpInfo: {
            type: Object,
            default: () => ({
                tmpname: "",
                tmptype: "",
                tmpind: 0,
                tmppath: ""
            })
        }
    },
    emit: ["onSave"],
    setup(props, context) {
        const templateType = shallowRef([]);
        const tipsText = ref("");
        const { loading: tipStatus, setupLoading: setupTipStatus } = Load(false);
        const fileStatusToHandler = {
            ready: fileChangeToReady,
            success: fileChangeToSuccess,
            error: fileChangeToError
        };
        const uploadRefs = ref();
        const formRefs = ref();
        const formFileReady = ref(false);
        const formFileTips = computed(() => {
            const def = "模板文件限制文件类型为 .csv, 且仅能上传一份模板!";
            return unref(tipStatus) ? unref(tipsText) : def;
        });
        const formFileTipsClass = computed(() => {
            return unref(tipStatus) ? ["defailt-file-tips-warn"] : [];
        });
        const formFile = ref(
            hasFileUsable(unref(props).tmpInfo.tmppath)
                ? [setupFileFormat(unref(props).tmpInfo.tmppath)]
                : []
        );
        const formData = reactive({
            tmpname: unref(props).tmpInfo.tmpname,
            tmptype: unref(props).tmpInfo.tmptype,
            tmpind: unref(props).tmpInfo.tmpind,
        });
        const formRequest = computed(() => {
            return {
                ...unref(formData),
                tmppath: unref(formFile).length > 0 ? unref(formFile)[0].url : unref(props).tmpInfo.tmppath
            }
        });
        const formRules = {
            tmptype: [
                { required: true, message: '请选择模板类型', trigger: 'change' }
            ]
        };

        async function handlerEdit() {
            setupTipStatus(false);
            try {
                await unref(formRefs).validate();
                // 检查是否需要上传文件，如果不需要则直接提交修改
                unref(formFileReady) ? handlerUpload() : handlerSave();
            } catch (error) {
                console.log(error);
            }
        }

        function handlerReset() {
            setupTipStatus(false);
            unref(formRefs).resetFields();
        }

        function handlerSave() {
            context.emit("onSave", unref(formRequest));
        }

        function handlerUpload() {
            unref(uploadRefs).submit();
        }

        function setupHttpRequest(request) {
            const { file } = request;
            const fileData = new FormData();
            fileData.append("files", file);

            return fileUpload(fileData);
        }

        function fileChangeToReady() {
            formFileReady.value = true;
        }
        function fileChangeToSuccess(file) {
            const { response } = file;
            const [url] = response.data;
            formFile.value = [setupFileFormat(url)];
            formFileReady.value = false;
            handlerSave();
        }
        function fileChangeToError() {
            formFile.value = [];
            formFileReady.value = false;
            handlerSave();
        }

        function fileOnChange(file) {
            setupTipStatus(false);
            const { status } = file;
            const handler = fileStatusToHandler[status];
            isFunction(handler) && handler(file);
        }

        function fileOnRemove(file) {
            setupTipStatus(false);
            remove(unref(formFile), item => item.name === file.name);
            formFileReady.value = false;
        }

        function fileOnPreview(file) {
            console.log("文件预览", file);
        }

        function fileOnExceed(files) {
            const [file] = Object.values(files);
            const { name } = file;
            tipsText.value = `"${name}" 添加失败，只能上传一份模板`;
            setupTipStatus(true);
        }

        function fileBeforeUpload(file) {
            return true;
        }

        onMounted(async () => {
            templateType.value = await icmTemplateTypeGet();
        });

        return {
            formFileTips,
            formFileTipsClass,
            uploadRefs,
            formRefs,
            formFile,
            formData,
            formRules,
            templateType,
            handlerEdit,
            handlerReset,
            setupHttpRequest,
            fileOnChange,
            fileOnRemove,
            fileOnPreview,
            fileOnExceed,
            fileBeforeUpload,
        }
    }
};
</script>
<style lang='scss' scoped>
.modules-import-tmp-details {
    width: 100%;
    height: 100%;
    padding: 0 12px;
    overflow: hidden;
    box-sizing: border-box;
}

.defailt-file-tips {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    margin-top: 6px;
    color: #fff;
    padding: 0 12px;
    border-radius: 6px;
    background-color: #3f7cc4;
    box-sizing: border-box;
}

.defailt-file-tips-warn {
    background-color: #F56C6C;
}

/deep/.el-form-item__label {
    color: #fff;
}

/deep/.el-upload-list__item.is-success .el-upload-list__item-name:focus,
/deep/.el-upload-list__item.is-success .el-upload-list__item-name:hover {
    color: #fff;
}

/deep/.el-upload-list__item-name,
/deep/.el-upload-list__item-name i {
    color: #fff;
}

/deep/.el-tree-node__content:hover,
/deep/.el-upload-list__item:hover {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
}
</style>
