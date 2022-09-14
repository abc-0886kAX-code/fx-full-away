/*
 * @Author: zhangyang
 * @Date: 2021-06-15 11:15:43
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-06-15 11:15:56
 * @Description: file content
 */
import { isNil, isNumber } from "lodash";
export default {
    name: "biz-view-mixins",
    mixins: [],
    components: {},
    props: {
        scope: {
            type: Object,
            default: () => ({}),
        },
        labelWidth: [Number, String],
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        uiSchema() {
            const { uiSchema } = this.scope;
            return uiSchema;
        },
        label() {
            const { label } = this.uiSchema;
            return label || "未知标记";
        },
        itemWidth() {
            const { itemWidth } = this.uiSchema;
            const width = isNil(itemWidth) ? this.labelWidth : itemWidth;

            return isNumber(width) ? `${width}px` : width;
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};