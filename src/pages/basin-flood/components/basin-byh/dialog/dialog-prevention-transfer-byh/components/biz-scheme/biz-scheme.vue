<!--
 * @Author: zhangyang
 * @Date: 2021-05-26 15:07:04
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-21 15:45:15
 * @Description: file content
-->
<template>
    <div class="ytxd-biz-scheme">
        <el-image :src="img" :fit="fit"></el-image>
        <table
            class="hedgingTab"
            width="100%"
            border="1"
            cellspacing="0"
            cellpadding="0"
            bordercolor="#D7DBDF"
        >
            <tr>
                <th rowspan="2">避险单位</th>
                <th rowspan="2">转移路线</th>
                <th rowspan="2">转移地点</th>
                <th rowspan="2">转移条件</th>
                <th colspan="3">联系人</th>
            </tr>
            <tr>
                <th>姓名</th>
                <th>职务</th>
                <th>电话</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="index">
                <td>{{ item.safetyunit }}</td>
                <td>{{ item.transferroute }}</td>
                <td>{{ item.shiftinglocations }}</td>
                <td>{{ item.transfercondition }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.job }}</td>
                <td>{{ item.telephone }}</td>
            </tr>
        </table>
        <h3>组织部门</h3>
        <p v-html="detailsData.organizationdepartments"></p>
        <h3>转移方案</h3>
        <p v-html="detailsData.transfers"></p>
    </div>
</template>

<script>
import { default as DialogContentMixins } from "@/mixins/dialog-content.mixins";
import { computed, onMounted, unref, ref } from "@vue/composition-api";
import { getHYTPVillageDetails } from "@/pages/basin-flood/components/basin-jyh/api";

export default {
    name: "ytxd-biz-scheme",
    mixins: [DialogContentMixins],
    components: {},
    props: {},
    setup(props, context) {
        const params = computed(() => {
            return {
                stcd: props.info.stcd,
                tp: props.info.tp,
            };
        });

        const tableData = ref([]);

        const detailsData = ref({});

        const img = computed(() => {
            // 图片地址 目前没有拼接前缀
            return detailsData.villageattachment;
        });

        const executeQuery = async (params) => {
            context.emit("loadStart");

            const data = await getHYTPVillageDetails(params);

            const { pictureanddetails, transferslist } = data;

            tableData.value = transferslist;

            detailsData.value = pictureanddetails[0];

            context.emit("loadEnd");
        };

        onMounted(async () => {
            await executeQuery(unref(params));
        });

        return {
            tableData,
            detailsData,
            img,
            fit: "scale-down",
        };
    },
};
</script>
<style lang='scss' scoped>
.ytxd-biz-scheme {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    white-space: pre-wrap;
    color: #fff;
}
.hedgingTab th {
    height: 35px;
    font-size: 16px;
    background: #6096d3;
}
.hedgingTab td {
    height: 50px;
    font-size: 16px;
    padding-left: 5px;
}

.ytxd-biz-scheme h2 {
    color: #3580c9;
    font-size: 16px;
}
.ytxd-biz-scheme h3 {
    margin-top: 10px;
    margin-bottom: 10px;
}
.ytxd-biz-scheme p {
    line-height: 27px;
    font-size: 14px;
}
</style>