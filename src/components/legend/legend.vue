<!--
 * @Author: zhangyang
 * @Date: 2021-07-02 10:43:51
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-08-12 12:59:32
 * @Description: file content
-->
<template>
    <div class="ytxd-legend">
        <h3 class="ytxd-legend-label">{{ label }}</h3>
        <!-- <p class="ytxd-legend-time">{{ time }}</p> -->

        <ul class="ytxd-legend-list">
            <li
                class="ytxd-legend-item"
                v-for="(item, index) in data"
                :key="index"
            >
                <template v-if="useImgRender">
                    <img
                        class="ytxd-legend-icon"
                        :src="setBase64ImgSrc(item)"
                    />
                    <p class="ytxd-legend-text">{{ item.label }}</p>
                </template>

                <template v-else>
                    <div class="ytxd-legend-box" :style="boxStyle(item)"></div>
                    <p class="ytxd-legend-text">{{ setLabel(item) }}</p>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "ytxd-legend",
    mixins: [],
    components: {},
    props: {
        label: {
            type: String,
            default: "图例",
        },
        data: {
            type: [Array, Object],
            default: () => [],
        },
        mode: {
            type: String,
            default: "img",
        },
    },
    data() {
        //这里存放数据
        return {
            // yyyy-MM-dd
            // time: "",
        };
    },
    //监听属性 类似于data概念
    computed: {
        useImgRender() {
            return this.mode === "img";
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        setBase64ImgSrc(item) {
            const { imageData, contentType } = item;

            return `data:${contentType};base64,${imageData}`;
        },
        boxStyle(item) {
            const { color } = item;
            return {
                backgroundColor: `rgba(${color})`,
            };
        },
        setLabel(item) {
            const { label } = item;
            return label;
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
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./legend.scss";
</style>