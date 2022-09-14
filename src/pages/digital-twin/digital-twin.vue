<!--
 * @Author: zhangxin
 * @Date: 2022-05-19 13:55:39
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-24 14:42:34
 * @Description: 数字孪生
-->
<template>
    <screen-grid-container>
        <template v-slot:head>
            <screen-grid-select
                icon="el-icon-s-platform"
                :active.sync="active"
                :menu="menu"
                :width="80"
                @toComponent="handlerComponent"
                @toDialog="handlerDialog"
            >
                <template #default="node">
                    <screen-grid-node :node="node"></screen-grid-node>
                </template>
            </screen-grid-select>
        </template>

        <template v-slot:body>
            <!-- <video
                width="100%"
                height="100%"
                src="../../../public/mp4/shuziluansheng.mp4"
                type="video/mp4"
                autoplay
                muted
            ></video> -->
            <div class="digital-twin">
                <video-player
                    class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                ></video-player>
            </div>
        </template>
    </screen-grid-container>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { ref } from "@vue/composition-api";
import videoMp4 from "../../../public/mp4/shuziluansheng.mp4";
const DiaitalTwinMenu = {
    defaultID: "df3468a2739f412aad1ff82ad42e9414",
    menu: [
        {
            id: "df3468a2739f412aad1ff82ad42e9414",
            label: "数字孪生",
            component: "",
        },
    ],
};
export default {
    name: "digital-twin",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    setup(props, context) {
        const { menu, defaultID } = DiaitalTwinMenu;
        const active = ref(defaultID);
        const componentName = ref("");

        const handlerComponent = (cell) => {
            const { component } = cell;

            componentName.value = component;
        };

        const handlerDialog = (cell) => {
            context.emit("onDialog", cell);
        };

        return {
            menu,
            active,
            componentName,
            handlerComponent,
            handlerDialog,
            playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: true, //如果true,浏览器准备好时开始回放。
                muted: true, // 默认情况下将会消除任何音频。
                loop: true, // 导致视频一结束就重新开始。
                preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: "zh-CN",
                aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                        type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: require("../../../public/mp4/shuziluansheng.mp4"), //url地址
                    },
                ],
                poster: "", //你的封面地址
                // width: document.documentElement.clientWidth, //播放器宽度
                notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true, //全屏按钮
                },
            },
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./digital-twin.scss";
</style>