/*
 * @Author: zhangyang
 * @Date: 2022-04-18 15:23:19
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-20 14:17:01
 * @Description: file content
 */
import { inject } from "@vue/composition-api";

export default {
    name: 'panel-cell-mixins',
    mixins: [],
    components: {},
    props: {
        id: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: ""
        }
    },
    setup(props) {
        const provideSource = inject(props.id, {});
        return {
            provideSource
        }
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handlerCollect() {
            return {}
        },
        install() {
            this.$emit("handlerCollect", this.handlerCollect());
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