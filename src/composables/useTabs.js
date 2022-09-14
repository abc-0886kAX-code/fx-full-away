/*
 * @Author: zhangyang
 * @Date: 2022-04-13 10:40:25
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-05-06 09:50:15
 * @Description: file content
 */
import { ref } from '@vue/composition-api';

export function useTabs(tabs, ac = "") {
    const componentName = ref("unknow");
    const active = ref(ac);
    const mapList = ref(tabs);
    const setupActive = (ac = "") => active.value = ac;
    const setupMapList = (tabs = []) => mapList.value = tabs;

    return {
        tabActive: active,
        tabsMap: mapList,
        setupTabActive: setupActive,
        setupTabsMap: setupMapList,
    }
}