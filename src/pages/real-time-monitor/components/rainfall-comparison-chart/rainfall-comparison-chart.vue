<!--
 * @Author: zhangxin
 * @Date: 2022-07-08 13:25:35
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-10 14:29:33
 * @Description:
-->
<template>
    <div class="rainfall-comparison-chart">
        <div class="rainfall-comparison-chart-select">
            <div>
                <el-date-picker
                    v-model="dateVal"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd HH:mm:ss"
                    size="mini"
                    value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>

                <el-button class="query-btn" size="mini" @click="handlerQuery" type="primary">查询</el-button>
            </div>
        </div>
        <div class="rainfall-comparison-chart-body">
            <div class="rainfall-comparison-chart-body-content" v-for="(img, index) in imgList.imageList" :key="index">
                <span>{{ img.title }}</span>
                <el-image
                    class="rainfall-comparison-chart-body-content-img"
                    :src="img.url"
                    :preview-src-list="imgList.previewSrcList"
                ></el-image>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { unref, onMounted, onBeforeUnmount, ref, computed } from "@vue/composition-api";
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { getRainfallComparisonChart } from "@/pages/real-time-monitor/api/real-time-monitor.api";
import { getTodayEight } from "@/composables/biz-search/share";
import format from "date-fns/format";
const nowDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

export default {
    name: "rainfall-comparison-chart",
    //混入
    mixins: [DialogContentMixins],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    setup(props, context) {
        const dateVal = ref([getTodayEight(), nowDate]);
        const imgList = ref({});
        const params = computed(() => ({
            starttime: unref(dateVal)[0],
            endtime: unref(dateVal)[1]
        }));

        const handlerQuery = async () => {
            context.emit("loadStart");

            const list = await getRainfallComparisonChart(unref(params));

            imgList.value = list;

            context.emit("loadEnd");
        };

        onMounted(() => {
            handlerQuery();
        });

        onBeforeUnmount(() => {});

        return {
            handlerQuery,
            imgList,
            dateVal
        };
    }
};
</script>
<style lang='scss' scoped>
@import "./rainfall-comparison-chart.scss";
.query-btn {
    margin-left: 10px;
}
</style>