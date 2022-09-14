<!--
 * @Author: zhangxin
 * @Date: 2022-07-07 14:09:47
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-13 10:31:37
 * @Description: 
-->
<template>
    <div class="data-import-form">
        <el-form
            class="data-import-form-body"
            :model="ruleForm"
            :rules="dataStructure.rules"
            ref="ruleFormRef"
            label-width="100px"
        >
            <el-form-item
                :label="dataStructure.inputInfo.label"
                prop="templateName"
            >
                <el-input
                    v-model="ruleForm.templateName"
                    :placeholder="dataStructure.inputInfo.placeholder"
                ></el-input>
            </el-form-item>

            <el-form-item
                :label="dataStructure.selectInfo.label"
                prop="importoptions"
            >
                <el-select
                    v-model="ruleForm.importoptions"
                    placeholder="请选择模板类型"
                >
                    <el-option
                        v-for="item in dataStructure.selectInfo.selectData
                            .value"
                        :key="item.tmpid"
                        :label="item.tmpname"
                        :value="toJsonString(item)"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                :label="dataStructure.datePickerInfo.label"
                prop="timeValue"
            >
                <el-date-picker
                    v-model="ruleForm.timeValue"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item
                :label="dataStructure.textareaInfo.label"
                prop="remarksVale"
            >
                <el-input
                    type="textarea"
                    v-model="ruleForm.remarksVale"
                    :placeholder="dataStructure.textareaInfo.placeholder"
                ></el-input>
            </el-form-item>
            <el-form-item label="模板文件">
                <el-upload
                    ref="uploadRefs"
                    action="#"
                    :limit="1"
                    :file-list="formFile"
                    :multiple="false"
                    :show-file-list="true"
                    :auto-upload="false"
                    :http-request="setupHttpRequest"
                    :on-remove="fileOnRemove"
                    :on-change="fileOnChange"
                    :on-preview="fileOnPreview"
                    :on-exceed="fileOnExceed"
                    :before-upload="fileBeforeUpload"
                >
                    <el-button slot="trigger" size="mini" type="primary"
                        >选取模板文件</el-button
                    >
                </el-upload>
                <p class="defailt-file-tips" :class="formFileTipsClass">
                    {{ formFileTips }}
                </p>
            </el-form-item>

            <el-form-item style="text-align: left">
                <el-button
                    :type="dataStructure.subButtonInfo.type"
                    @click="submitForm(ruleFormRef)"
                    >{{ dataStructure.subButtonInfo.label }}</el-button
                >
                <el-button
                    :type="dataStructure.resetButtonInfo.type"
                    @click="resetForm(ruleFormRef)"
                    >{{ dataStructure.resetButtonInfo.label }}</el-button
                >
                <el-button
                    :disabled="!status"
                    :type="dataStructure.downloadButtonInfo.type"
                    @click="downloadForm(ruleFormRef)"
                    >{{ dataStructure.downloadButtonInfo.label }}</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { computed, unref, inject, reactive, ref } from "@vue/composition-api";
import { downloadFile } from "@/biz/common-template/utils";
import { fileUpload } from "@/api/common.api";
import { Load } from "@/biz/share/entify/Load";
import { remove, isFunction, isString } from "lodash";

function hasFileUsable(url) {
    return isString(url) && url.length > 0;
}

function setupFileFormat(url = "") {
    const name = url.split("/").at(-1);
    return { name, url, usable: hasFileUsable(url) };
}

export default {
    name: "data-import-form",
    mixins: [],
    components: {},
    props: {
        structure: {
            type: Object,
            default: () => ({}),
        },
    },
    emit: ["submitForm", "resetForm", "downloadForm", "uploadForm"],
    setup(props, context) {
        const ruleFormRef = ref();
        const ruleForm = reactive({
            templateName: "",
            remarksVale: "",
            selectName: "",
            timeValue: [],
            importoptions: "",
        });

        const status = computed(() => Boolean(ruleForm.importoptions));

        const downloadParameter = computed(() =>
            JSON.parse(ruleForm.importoptions)
        );

        const handlerSave = () => {
            if (!unref(ruleFormRef)) return;
            context.emit("submitForm", unref(ruleFormRef), ruleForm);
        };

        const toJsonString = (jsonString) => {
            return JSON.stringify(jsonString);
        };

        const resetForm = () => {
            setupTipStatus(false);
            if (!unref(ruleFormRef)) return;
            context.emit("resetForm", unref(ruleFormRef));
        };

        const downloadForm = () => {
            const { tmppath } = unref(downloadParameter);
            downloadFile(process.env.VUE_APP_IMG_HOST + tmppath);
        };

        //提交方法
        async function submitForm(formRefs) {
            setupTipStatus(false);
            try {
                await unref(formRefs).validate();
                // 检查是否需要上传文件，如果不需要则直接提交修改
                unref(formFileReady) ? handlerUpload() : handlerSave();
            } catch (error) {
                console.log(error);
            }
        }

        function handlerUpload() {
            unref(uploadRefs).submit();
        }

        // 上传方法开始
        const uploadRefs = ref();
        const tipsText = ref("");
        const formFile = [];
        const formFileReady = ref(false);

        //文件预览方法
        function fileOnPreview(file) {
            console.log("文件预览", file);
        }

        function fileBeforeUpload(file) {
            return true;
        }

        //限制上传多个文件
        function fileOnExceed(files) {
            const [file] = Object.values(files);
            const { name } = file;
            tipsText.value = `"${name}" 添加失败，只能上传一份模板`;
            setupTipStatus(true);
        }

        const fileStatusToHandler = {
            ready: fileChangeToReady,
            success: fileChangeToSuccess,
            error: fileChangeToError,
        };

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

        const { loading: tipStatus, setupLoading: setupTipStatus } =
            Load(false);

        //文件监听方法，通过状态执行所对应的方法
        function fileOnChange(file) {
            setupTipStatus(false);
            const { status } = file;
            const handler = fileStatusToHandler[status];
            isFunction(handler) && handler(file);
        }

        //删除列表文件
        function fileOnRemove(file) {
            setupTipStatus(false);
            remove(unref(formFile), (item) => item.name === file.name);
            formFileReady.value = false;
        }

        //文件提示语
        const formFileTips = computed(() => {
            const def = "模板文件限制文件类型为 .csv, 且仅能上传一份模板!";
            return unref(tipStatus) ? unref(tipsText) : def;
        });

        //文件提示语所对应的样式
        const formFileTipsClass = computed(() => {
            return unref(tipStatus) ? ["defailt-file-tips-warn"] : [];
        });

        //上传请求
        function setupHttpRequest(request) {
            const { file } = request;
            const fileData = new FormData();
            fileData.append("files", file);
            return fileUpload(fileData);
        }

        // 上传方法结束

        const dataStructure = computed(() => {
            return props.structure;
        });

        return {
            ruleFormRef,
            ruleForm,
            submitForm,
            resetForm,

            uploadRefs,
            formFile,
            formFileTips,
            formFileTipsClass,
            setupHttpRequest,
            fileOnRemove,
            fileOnChange,
            fileOnPreview,
            fileOnExceed,
            fileBeforeUpload,

            downloadForm,
            dataStructure,
            status,
            toJsonString,
        };
    },
};
</script>   
<style lang='scss' scoped>
.data-import-form {
    display: flex;
    justify-content: center;
    align-items: center;
    &-body {
        width: 800px;
        height: auto;
    }
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
    background-color: #f56c6c;
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
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
}
</style>