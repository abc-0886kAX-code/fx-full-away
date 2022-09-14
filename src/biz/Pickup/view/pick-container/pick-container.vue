<!--
 * @FilePath: \3D防汛作战\src\biz\Pickup\view\pick-container\pick-container.vue
 * @Author: zhangyang
 * @Date: 2022-06-16 15:57:06
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-16 18:07:49
 * @Description: 
-->
<template>
    <pick-list></pick-list>
</template>

<script>
import { default as PickList } from "@/biz/Pickup/view/pick-list";
import { default as PickNode } from "@/biz/Pickup/view/pick-node";

import useContainer from "@/biz/Pickup/usecase/useContainer";

export default {
    name: 'pick-container',
    mixins: [],
    components: {
        PickList,
        PickNode
    },
    props: {
        schema: {
            type: Array,
            default: () => ([])
        }
    },
    setup(props) {
        useContainer(props);

        return {}
    }
};
</script>
<style lang='scss' scoped>
@import "./pick-container.scss";
</style>
