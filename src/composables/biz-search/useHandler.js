/*
 * @Author: zhangyang
 * @Date: 2022-04-18 10:19:31
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-05-11 16:38:20
 * @Description: file content
 */
import { ref } from '@vue/composition-api';
import { isFunction } from "lodash";

export function useSearchHandler() {
    const formRefs = ref();
    const currentSelectVal = ref(null)
    const handlerSelect = async (handler) => {
        const { data } = formRefs.value.formOutput();

        if (isFunction(handler)) return await handler(data);

        return Promise.resolve(data);
    }
    const handlerReset = () => {
        formRefs.value.resetForm();
    }

    const monitorValue = (e) => {
        currentSelectVal.value = e.value
    }

    return {
        formRefs,
        currentSelectVal,
        handlerSelect,
        handlerReset,
        monitorValue,
    }
}