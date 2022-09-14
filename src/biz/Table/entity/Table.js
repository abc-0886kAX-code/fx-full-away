/*
 * @Author: zhangyang
 * @Date: 2022-04-21 09:18:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-27 16:07:19
 * @Description: file content
 */
import { Load } from "@/biz/share/entify/Load";
import { Sign } from "@/biz/share/entify/Sign";
import { Column } from "@/biz/Table/entity/Column";
import { Controller } from "@/biz/Table/entity/Controller";
import { Data } from "@/biz/Table/entity/Data";
import { TableChoice } from "@/biz/Table/entity/TableChoice";
import { Uischema } from "@/biz/Table/entity/Uischema";
import { computed } from "@vue/composition-api";


export function Table() {
    const { sign, setupSign } = Sign();
    const { loading, setupLoading } = Load();
    const { column, setupColumn } = Column();
    const { data, setupData } = Data();
    const { controller, setupController } = Controller();
    const { uiSchema, setupUiSchema } = Uischema();
    const { tableChoice, setupChoice, resetChoice, getChoiceData } = TableChoice();

    const table = computed(() => ({
        sign,
        loading,
        column,
        data,
        controller,
        uiSchema,
        tableChoice
    }));

    return {
        table,
        setupSign,
        setupLoading,
        setupColumn,
        setupData,
        setupController,
        setupUiSchema,
        resetChoice,
        setupChoice,
        getChoiceData
    }
}