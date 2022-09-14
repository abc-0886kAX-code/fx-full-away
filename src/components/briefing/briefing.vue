<!--
 * @Author: zhangxin
 * @Date: 2022-07-05 17:45:42
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-05 17:57:21
 * @Description: 
-->
<template>
    <div class="briefing">
        <div class="simulationBox">
            <p class="simulationTitle">{{ data.label }}</p>
            <div v-for="item in data.listData" :key="item.field">
                <h4>
                    <a>{{ item.label }}</a
                    ><span>{{ item.handler(item.value) }}</span>
                </h4>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { computed } from "@vue/composition-api";
export default {
    name: "briefing",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
        dataStructure: {
            type: Object,
            default: () => {},
        },
    },
    setup(props) {
        const data = computed(() => {
            return props.dataStructure;
        });
        return {
            data,
        };
    },
};
</script>
<style lang='scss' scoped>
@import "./index.scss";
</style>