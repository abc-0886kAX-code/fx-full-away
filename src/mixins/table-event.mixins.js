/*
 * @Author: zhangxin
 * @Date: 2022-04-27 14:56:06
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-27 16:10:00
 * @Description: 
 */
export default {
    name: 'table-event-mixins',
    mixins: [],
    components: {},
    props: {},
    setup() {
        return {}
    },
    data() {
        //这里存放数据
        return {
            eventBus: {},
            labelEventBus: {}
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        onChoice(e) {
            this.setupChoice(e)
        },
        handleRow(e) {
            const { mode, row } = e;

            if (!this.eventBus[mode]) return false;

            this.eventBus[mode](row);
        },
        handlerClickEvent(sign) {

            if (!this.labelEventBus[sign]) return false

            this.labelEventBus[sign]()
        },
        resetComparison() {
            this.resetChoice()
            console.log('重置');
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$nextTick(this.install);
    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};