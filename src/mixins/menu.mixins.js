/*
 * @Author: zhangyang
 * @Date: 2021-05-12 09:19:09
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-18 17:21:34
 * @Description: file content
 */
import { defaultString } from "@/utils";
export default {
    name: "ytxd-menu-mixins",
    mixins: [],
    components: {},
    props: {},
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
        getTitle(cell) {
            const { meta, name } = cell;
            const { title } = meta;
            return defaultString(title, name);
        },
        getIcon(cell) {
            const { meta } = cell;
            const { icon } = meta;
            return defaultString(icon, "el-icon-location");
        },
        renderSubmenu(cell) {
            return cell.children && cell.children.length > 0;
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
}