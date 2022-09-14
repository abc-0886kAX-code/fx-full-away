/*
 * @Author: zhangyang
 * @Date: 2022-04-13 13:30:42
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-13 13:31:43
 * @Description: file content
 */
import { ref } from '@vue/composition-api';

export function usePanel(panel, ac = "") {
    const active = ref(ac);

    return {
        panelActive: active,
        panelMap: Object.freeze(panel)
    }
}