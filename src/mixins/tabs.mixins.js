/*
 * @Author: zhangyang
 * @Date: 2021-05-26 13:09:22
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-04 14:51:44
 * @Description: file content
 */
import { cloneDeep, isNil, isString } from 'lodash';
export default {
    name: "mg-tabs-mixins",
    mixins: [],
    components: {},
    props: {
        active: {
            type: String,
            default: () => "crown"
        },
        tabs: {
            type: Array,
            default: () => [
                {
                    id: "crown",
                    label: "王冠",
                    icon: "",
                },
                {
                    id: "wisdom",
                    label: "智慧",
                    icon: "",
                },
                {
                    id: "binah",
                    label: "理解",
                    icon: "",
                },
            ]
        },
        intercept: {
            type: Boolean,
            default: () => false
        },
        tabsType: {
            type: String,
            default: ''
        },
        tabPosition: {
            type: String,
            default: 'top'
        }

    },
    data() {
        //这里存放数据
        return {
            tabActive: this.setActive(this.active)
        };
    },
    //监听属性 类似于data概念
    computed: {
        tabsMap() {
            const map = {};

            this.tabs.forEach((cell, index) => {
                const { id } = cell;
                map[id] = this.createTabCell(cell, index);
            });

            return map;
        }
    },
    //监控data中的数据变化
    watch: {
        active(newVal) {
            this.tabActive = this.setActive(newVal);
        },
        tabActive(newVal) {
            this.$emit('update:active', newVal);
        }
    },
    //方法集合
    methods: {
        setActive(active) {
            if (active) return active;

            return this.tabs[0]?.id ?? "";
        },
        beforeLeave(activeName, oldActiveName) {
            if (!this.intercept) {
                return activeName;
            } else {
                return new Promise((resolve, reject) =>
                    this.$emit("before-leave", {
                        activeName,
                        oldActiveName,
                        resolve,
                        reject,
                    })
                );
            }
        },
        getTabRow(id, funcName = "") {
            const func = this[funcName];
            const row = this.tabsMap[id];

            func && func(row);
            this.$emit('handle-tabs', row);
        },
        setBaseTab(id, func) {
            const data = this.tabs.filter(cell => cell?.id === id);
            const base = data.length <= 0 ? false : data[0];

            func(base);
        },
        // 创建切换单元格
        createTabCell(data, index) {
            const cloneData = cloneDeep(data);
            const { label, icon } = cloneData;
            const baseLabel = this.hasString(label, `tab-${index}`);
            const baseIcon = this.hasString(icon);

            return {
                ...cloneData,
                label: baseLabel,
                icon: baseIcon,
                index: index,
            }
        },
        hasString(str, def = "") {
            return !isNil(str) && isString(str) ? str : def;
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getTabRow(this.tabActive);
    },
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
