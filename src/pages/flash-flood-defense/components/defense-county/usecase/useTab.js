/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\usecase\useTab.js
 * @Author: zhangyang
 * @Date: 2022-08-03 13:38:59
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-03 15:57:50
 * @Description: 
 */
import { provide, inject } from "@vue/composition-api";

import { EnumEntity } from "../entity/Enum";
import { TabContainerSymbolName } from "../shared/context";
import TabComponent from "../shared/tab";
import { setupEnumField } from "../shared/utils";

export function useTabInject() {
    return inject(TabContainerSymbolName);
}

export function useTab(id, key) {
    const TabProps = {};
    Object.keys(TabComponent[id]).forEach((key) => {
        const { label, name } = TabComponent[id][key];
        TabProps[key] = { label, name };
    });

    const output = setupEnumField("tab", EnumEntity({ key, data: TabProps }));

    provide(TabContainerSymbolName, {
        ...output,
        menuID: id
    });
    return output;
}

export default useTab;
