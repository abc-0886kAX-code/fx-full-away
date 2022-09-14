<!--
 * @Author: zhangyang
 * @Date: 2021-06-30 15:46:33
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-08-11 10:08:19
 * @Description: file content
-->
<template>
    <el-collapse class="ytxd-radio-panel" v-model="activeNames">
        <el-collapse-item
            v-for="item in data"
            :key="item[nodeKey]"
            :title="item.label"
            :name="item[nodeKey]"
        >
            <ul class="ytxd-radio">
                <li
                    class="ytxd-radio-item"
                    v-for="cell in item.children"
                    :key="cell[nodeKey]"
                    @click="handlerChange(cell)"
                >
                    <span :class="checkClassName(cell)"></span>
                    <p>{{ cell.label }}</p>
                </li>
            </ul>
            <slot></slot>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
const defaultExpand = (list, keyName) =>
    list.map((item) => {
        const { [keyName]: key, children } = item;

        children.length > 0 && defaultExpand(children, keyName);

        return key;
    });

const defaultActive = (list, keyName) => {
    const data = dataMap(list, keyName);

    return data.length <= 0 ? "" : data[0];
};

const dataMap = (list, keyName) =>
    list
        .map((item) => {
            const { children, status } = item;

            return children.length <= 0 && status
                ? item
                : defaultActive(children, keyName);
        })
        .filter((item) => item);

const countObjSize = (obj) => (Object.keys(obj).length <= 0 ? false : obj);
export default {
    name: "ytxd-radio-panel",
    mixins: [],
    components: {},
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        nodeKey: {
            type: String,
            default: "id",
        },
    },
    data() {
        //这里存放数据
        const defaultNode = defaultActive(this.data, this.nodeKey);

        return {
            activeNames: defaultExpand(this.data, this.nodeKey),
            radio: defaultNode[this.nodeKey],
            radioNode: defaultNode,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        checkClassName(cell) {
            const { [this.nodeKey]: key } = cell;
            return this.radio === key ? "ytxd-radio-active" : "";
        },
        handlerChange(cell) {
            const { [this.nodeKey]: key } = cell;

            const oldNode = countObjSize(this.radioNode);

            this.radio = this.radio === key ? "" : key;

            this.radioNode = this.radio ? cell : false;

            this.$emit("select-change", {
                node: this.radioNode,
                oldNode,
                status: this.radio ? true : false,
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$nextTick(() => {
            this.$emit("select-change", {
                node: this.radioNode,
                oldNode: false,
                status: true,
            });
        });
    },
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
$color: #10244b;
$bg: rgba(
    $color: $color,
    $alpha: 0.6,
);
$shadow: rgba(
    $color: $color,
    $alpha: 0.3,
);

.ytxd-radio-panel {
    background-color: $bg;
    backdrop-filter: blur(3px);
    box-shadow: inset 0px 15px 15px -15px $shadow,
        inset 0px -15px 15px -15px $shadow;
    border-color: transparent;
    & /deep/.el-collapse-item__wrap,
    & /deep/.el-collapse-item__header {
        background-color: transparent;
        border-color: transparent;
        color: #f7eed6;
    }
    & /deep/.el-collapse-item__header {
        padding: 0 10px;
        box-sizing: border-box;
    }
    & .ytxd-radio {
        & .ytxd-radio-item {
            display: flex;
            padding: 0 10px;
            box-sizing: border-box;
            cursor: pointer;
            user-select: none;
            &:hover {
                background-color: rgba($color: $color, $alpha: 0.8);
            }
            & > span {
                align-self: center;
                display: block;
                position: relative;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background-color: #dcdfe6;
                border: 1px solid #dcdfe6;
                box-sizing: border-box;
            }
            & > span.ytxd-radio-active {
                border-width: 2px;
                border-color: #409eff;
                &::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    display: block;
                    width: 6px;
                    height: 6px;
                    margin-left: -3px;
                    margin-top: -3px;
                    border-radius: 50%;
                    background-color: #409eff;
                }
            }
            & > p {
                line-height: 26px;
                color: #f7eed6;
                padding-left: 8px;
            }
        }
    }
}
</style>