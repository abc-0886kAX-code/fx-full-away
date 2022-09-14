/*
 * @Author: zhangyang
 * @Date: 2021-05-25 09:32:18
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-25 09:46:19
 * @Description: file content
 */
import { ref } from '@vue/composition-api';

function useDialogProps() {
    const visable = ref(false);
    const loading = ref(true);

    return {
        visable,
        loading,
    }
}

export default useDialogProps;