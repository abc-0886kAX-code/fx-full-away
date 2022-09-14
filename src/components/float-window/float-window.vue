<!--
 * @Author: zhangyang
 * @Date: 2022-04-29 09:22:25
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-29 10:58:48
 * @Description: file content
-->
<template>
    <div class='float-window' v-show="visable" ref="floatRefs" :style="style">
        <template v-for="(item) in content">
            <div class="float-window-item" :key="item.field">
                <p class="float-window-item-label">
                    {{ item.label }}：
                </p>
                <p class="float-window-item-text" :style="item.style">
                    {{ item.text }}
                </p>
            </div>
        </template>
    </div>
</template>

<script>
import { ref, computed } from "@vue/composition-api";

export default {
    name: 'ytxd-float-window',
    mixins: [],
    components: {},
    props: {
        visable: {
            type: Boolean,
            default: false
        },
        positionStyle: {
            type: Object,
            default: () => ({
                left: 0,
                top: 0
            })
        },
        content: {
            type: Array,
            default: () => ([])
        }
    },
    setup(props) {
        const floatRefs = ref(null);

        const style = computed(() => {
            const { left, top } = props.positionStyle;
            return {
                left: `${left + 12}px`,
                top: `${top + 12}px`
            }
        });

        return {
            floatRefs,
            style
        }
    }
};
</script>
<style lang='scss' scoped>
@import "./float-window.scss";
</style>