<!--
 * @Author: zhangyang
 * @Date: 2021-05-13 15:01:04
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-19 15:20:47
 * @Description: file content
-->
<template>
    <div class="ytxd-movie-list">
        <ytxd-control-group class="controller" @height="getHeight">
            <el-col :span="4">
                <el-button
                    :type="playType"
                    size="small"
                    plain
                    @click="autoplay"
                    >{{ playLabel }}</el-button
                >
            </el-col>
            <el-col :span="24">日期框</el-col>
            <el-col :span="24">选择框</el-col>
        </ytxd-control-group>
        <section class="context" :style="{ height: contextHeight }">
            <main class="context-slider">
                <el-slider
                    v-model="sliderIndex"
                    :min="0"
                    :max="timeAxisLen"
                    :format-tooltip="handleFormat"
                ></el-slider>
            </main>

            <main class="context-main">
                <div class="switch-img">
                    <img :src="getActiveSrc(activeIndex)" />
                </div>

                <div class="time-axis">
                    <ytxd-empty v-if="isEmpty"></ytxd-empty>

                    <template v-else>
                        <el-scrollbar style="height: 100%">
                            <ul class="ytxd-time-axis">
                                <time-item
                                    v-for="(item, index) in timeAxis"
                                    :key="index"
                                    :cell="item"
                                    :index="index"
                                    :active="activeIndex"
                                    @switch="handleSwitch"
                                ></time-item>
                            </ul>
                        </el-scrollbar>
                    </template>
                </div>
            </main>
        </section>
    </div>
</template>

<script>
import YtxdEmpty from "@/components/empty";
import YtxdControlGroup from "@/components/control-group";
import TimeItem from "./time-item";
import { isFunction, isNil } from "lodash";
export default {
    name: "ytxd-movie-list",
    mixins: [],
    components: { YtxdEmpty, YtxdControlGroup, TimeItem },
    props: {
        srcSplit: Function,
        timeAxis: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        //这里存放数据
        return {
            defSrc: require("@/assets/images/radar/test.gif"),
            playStatus: false,
            playTimer: null,
            activeIndex: 0,
            sliderIndex: this.timeAxis.length - 1,
            contextHeight: "calc(100% - 50px)",
        };
    },
    //监听属性 类似于data概念
    computed: {
        isEmpty() {
            return this.timeAxis.length <= 0;
        },
        timeAxisLen() {
            return this.timeAxis.length - 1;
        },
        playType() {
            return this.playStatus ? "danger" : "primary";
        },
        playLabel() {
            return this.playStatus ? "停止播放" : "开始播放";
        },
    },
    //监控data中的数据变化
    watch: {
        sliderIndex(newVal) {
            this.activeIndex = this.timeAxisLen - newVal;
        },
        activeIndex(newVal) {
            this.sliderIndex = this.timeAxisLen - newVal;
        },
        playStatus(newVal) {
            newVal ? this.playStart() : this.playStop();
        },
    },
    //方法集合
    methods: {
        getHeight(height) {
            this.contextHeight = `calc(100% - ${height})`;
        },
        setSrc(src) {
            if (isFunction(this.srcSplit)) {
                return this.srcSplit(src);
            }

            return this.defSrc;
        },
        getActiveSrc(index) {
            const { url } = this.timeAxis[index];

            return this.setSrc(url);
        },
        getActiveDate(index) {
            const { time } = this.timeAxis[index];

            return time;
        },
        handleSwitch(index) {
            this.activeIndex = index;
            this.playStatus = false;
        },
        handleFormat(value) {
            if (isNil(value)) return "";

            return this.getActiveDate(value);
        },
        autoplay() {
            this.playStatus = !this.playStatus;
        },
        playStart() {
            if (this.activeIndex <= 0) {
                this.activeIndex = this.timeAxisLen;
            }

            this.playTimer = setInterval(() => {
                if (this.activeIndex <= 0) {
                    this.activeIndex = this.timeAxisLen + 1;
                }
                this.activeIndex -= 1;
            }, 600);
        },
        playStop() {
            if (!isNil(this.playTimer)) {
                clearInterval(this.playTimer);
                this.playTimer = null;
            }
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {
        this.playStatus = false;
    }, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./movie-list.scss";
</style>