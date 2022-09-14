/*
 * @Author: zhangxin
 * @Date: 2022-04-27 15:27:14
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-27 16:07:07
 * @Description: 
 */
import { shallowRef } from "@vue/composition-api";

export function TableChoice(sources = []) {
    const tableChoice = shallowRef(sources);

    const setupChoice = (sources = []) => tableChoice.value = sources;

    const resetChoice = (sources = []) => tableChoice.value = sources;

    const getChoiceData = () => tableChoice.value;

    return {
        tableChoice,
        getChoiceData,
        setupChoice,
        resetChoice
    }
}