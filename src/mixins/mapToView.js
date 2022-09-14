/*
 * @Author: zhangyang
 * @Date: 2020-12-09 10:13:12
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-12-03 11:04:38
 * @Description: file content
 */
export default {
    name: "sw-map-to-view",
    components: {},
    // 混入方法
    mixins: [],
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
        mapToView(coordinate, zoom = 9) {
            // this.$arcMap.setExtent(...coordinate);
            this.$arcMap.mapView.goTo(coordinate);
            this.$arcMap.mapView.zoom = zoom;
        }
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