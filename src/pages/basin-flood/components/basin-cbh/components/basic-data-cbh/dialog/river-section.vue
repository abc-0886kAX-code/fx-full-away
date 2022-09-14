<template>
    <!-- 河道断面弹框 -->
    <dialog-tabs-data :listData="listData"></dialog-tabs-data>
</template>

<script>
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { computed } from "@vue/composition-api";
import DialogTabsData from "@/components/dialog-tabs-data";

export default {
    name: "river-section",
    mixins: [DialogContentMixins],
    components: { DialogTabsData },
    props: {},
    setup(props, context) {
        context.emit("loadEnd");
        const listData = computed(() => {
            const { FID, NAME } = props.info;

            return [
                {
                    field: "FID",
                    label: "FID",
                    value: FID,
                    handler: (val) => `${val}`,
                },
                {
                    field: "NAME",
                    label: "名称",
                    value: NAME,
                    handler: (val) => `${val}`,
                },
            ];
        });

        return {
            listData,
        };
    },
};
</script>
<style lang='scss' scoped></style>