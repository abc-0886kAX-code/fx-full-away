/*
 * @Author: zhangyang
 * @Date: 2020-11-09 11:09:57
 * @LastEditors: zhangyang
 * @LastEditTime: 2020-11-19 16:56:10
 * @Description: 动态表单混入方法
 */
export default {
    name: "ytxd-form-mixins",
    components: {},
    props: {
        params: {
            type: Object,
            default: () => ({})
        },
        fieldName: {
            type: [String, Array],
            default: () => ""
        },
        fieldValue: {
            type: [String, Number, Object, Array],
            default: () => ""
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
        changeValue(fieldValue) {
            this.$emit("update:fieldValue", fieldValue);
            this.$emit('onChange', new Date().getTime());
        },
    },
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