<!--
 * @Author: zhangyang
 * @Date: 2021-07-16 10:52:56
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-07-21 09:46:49
 * @Description: file content
-->
<template>
    <div class="ytxd-progress-bar" ref="progress" @click="progressLocation">
        <p
            class="progress-label"
            ref="progressLabel"
            v-show="isLabel"
            :style="barLabelStyle"
        >
            {{ barLabel }}
        </p>
        <div class="progress-bar" :style="barStyle"></div>
    </div>
</template>

<script>
import { on, off } from "@/utils/dom";
import { ref } from "@vue/composition-api";

const allow = ["ytxd-progress-bar", "progress-bar"];

export default {
    name: "ytxd-progress-bar",
    mixins: [],
    components: {},
    props: {
        dataListLen: {
            type: Number,
            default: 0,
        },
        index: {
            type: Number,
            default: 0,
        },
        barLabel: {
            type: String,
            default: "",
        },
    },
    setup() {
        const progress = ref(null);
        const progressLabel = ref(null);

        return {
            progress,
            progressLabel,
        };
    },
    data() {
        //这里存放数据
        return {
            isLabel: false,
            offset: 0,
        };
    },
    //监听属性 类似于data概念
    computed: {
        barAverageWidth() {
            return 100 / this.dataListLen;
        },
        barIndexNumber() {
            return (this.index + 1) / this.dataListLen;
        },
        barWidth() {
            return this.barIndexNumber * 100 || 0;
        },
        barStyle() {
            return {
                width: `${this.barWidth}%`,
            };
        },
        barLabelStyle() {
            return {
                left: `${this.offset}px`,
            };
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handlerController(event) {
            const w = this.progress.clientWidth;
            const { offsetX } = event;
            const baseOffsetX = offsetX <= 0 ? 0 : offsetX >= w ? w : offsetX;
            const index = Math.floor(
                ((offsetX / w) * 100) / this.barAverageWidth
            );

            return {
                baseOffsetX,
                index,
            };
        },
        progressLocation(event) {
            const { index } = this.handlerController(event);
            this.$emit("location", index);
        },
        moveIndex(event) {
            const wl = this.progressLabel.clientWidth;
            const { baseOffsetX, index } = this.handlerController(event);

            this.offset = baseOffsetX - wl / 2;
            this.$emit("moveIndex", index);
        },
        mouseover(event) {
            if (this.includesAllowTarget(event)) this.isLabel = true;
        },
        mouseout(event) {
            // if (!this.includesAllowTarget(event)) this.isLabel = false;
            this.isLabel = false;
        },
        includesAllowTarget(event) {
            return allow.includes(this.getMouseTarget(event, "className"));
        },
        getMouseTarget(event, attributeName) {
            const { target } = event;
            return target[attributeName];
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$nextTick(() => {
            on(this.progress, "mousemove", this.moveIndex);
            on(this.progress, "mouseover", this.mouseover);
            on(this.progress, "mouseout", this.mouseout);
        });
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {
        off(this.progress, "mousemove", this.moveIndex);
        off(this.progress, "mouseover", this.mouseover);
        off(this.progress, "mouseout", this.mouseout);
    }, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./progress-bar.scss";
</style>