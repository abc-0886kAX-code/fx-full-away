/*
 * @Author: zhangyang
 * @Date: 2021-05-19 13:51:42
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-09 17:14:10
 * @Description: file content
 */
import { off, on } from '@/utils/dom';
import { isNil, isFunction, debounce } from 'lodash';
export default {
    name: "echarts-mixins",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            chart: null,
            resizeHandler: null,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        renderChart(renderFunc, options, chartBox = this.$el) {
            if (this.chart) {
                this.chart.setOption(options);
            } else {
                this.chart = renderFunc(chartBox, options);
            }
        },
        handResize() {
            isFunction(this.resizeHandler) && this.resizeHandler();
        },
        resize() {
            const { chart } = this;

            chart && chart.resize()
        },
        listener() {
            this.resizeHandler = debounce(this.resize, 60)
            // this.resizeHandler = this.resize

            on(window, 'resize', this.resizeHandler);
        },
        destroyListener() {
            if (isNil(this.resizeHandler)) return false;

            off(window, 'resize', this.resizeHandler);

            this.resizeHandler = null;
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$nextTick(() => {
            this.listener();
        })
    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() {
        this.destroyListener()
    }, //生命周期 - 销毁之前
    destroyed() {
        this.destroyListener()
    }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};