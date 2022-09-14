<!--
 * @Author: zhangxin
 * @Date: 2022-04-11 10:19:18
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-24 14:42:21
 * @Description: 
-->
<template>
    <div class="ytxd-schedule">
        <el-tabs tab-position="left">
            <template v-for="item in imgData">
                <el-tab-pane :key="item.id" :label="item.label">
                    <el-image
                        :src="item.path"
                        style="width: 100%; height: auto"
                        :preview-src-list="[item.path]"
                    ></el-image>
                </el-tab-pane>
            </template>
        </el-tabs>
    </div>
</template>

<script>
import { computed, onMounted, unref, ref } from "@vue/composition-api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { getReservoirSiteBehindDetails } from "@/pages/basin-flood/components/basin-cbh/api";
export default {
    name: "ytxd-schedule",
    mixins: [DialogContentMixins],
    components: {},
    props: {},
    setup(props, context) {
        const params = computed(() => {
            return { stcd: props.info.stcd, lxid: "schedule" };
        });

        const requestData = ref([]);

        const executeQuery = async () => {
            context.emit("loadStart");
            requestData.value = await getReservoirSiteBehindDetails(
                unref(params)
            );
            context.emit("loadEnd");
        };

        onMounted(async () => {
            await executeQuery();
        });

        const imgData = computed(() => {
            return requestData.value.map((item, index) => {
                return {
                    label: item.ename,
                    path: process.env.VUE_APP_IMG_HOST + item.filepath,
                    id: item.enid,
                };
            });
        });

        return {
            imgData,
        };
    },
};
</script>
<style lang='scss' scoped>
.ytxd-schedule {
    height: 100%;
    width: 98%;
    overflow-x: hidden;
    overflow-y: auto;
    white-space: pre-wrap;
    color: #fff;
    margin: 0 auto;
}
</style>