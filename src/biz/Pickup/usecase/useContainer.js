/*
 * @FilePath: \3D防汛作战\src\biz\Pickup\usecase\useContainer.js
 * @Author: zhangyang
 * @Date: 2022-06-16 18:02:07
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-16 18:06:05
 * @Description: 
 */
import {
    watch,
    provide,
    unref,
    shallowRef,
    computed
} from "@vue/composition-api";
import {SchemaSymbolName} from "@/biz/Pickup/share/context";

export default function useContainer(props) {
    const watchSchema = computed(() => unref(props.schema));
    const schema = shallowRef(unref(watchSchema));

    const transformSchema = (newSchema) => {
        console.log(newSchema);
    }

    provide(SchemaSymbolName, schema);

    watch(
        () => unref(watchSchema),
        transformSchema
    );

    return {}
}
