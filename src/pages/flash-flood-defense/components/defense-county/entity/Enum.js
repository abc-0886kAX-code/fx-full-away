/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\entity\Enum.js
 * @Author: zhangyang
 * @Date: 2022-08-03 13:10:18
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-03 15:56:39
 * @Description: 
 */
import { unref, ref, computed } from "@vue/composition-api";

export const EnumConfig = {
    key: "",
    data: {}
};

export function EnumEntity(props = {}) {
    const { key, data } = Object.assign({}, EnumConfig, props);
    const enumRef = ref(key);
    const enumBiz = computed(() => {
        const node = data[unref(enumRef)];
        return node ? {
            ...node,
            key: unref(enumRef)
        } : {};
    });
    const hasEnumBiz = computed(() => Object.keys(enumBiz).length > 0);

    function setupEnumKey(key) {
        if (unref(enumRef) === key) return;

        enumRef.value = key;
    }

    function resetEnumKey() {
        setupEnumKey(key);
    }

    return {
        enum: data,
        key: enumRef,
        biz: enumBiz,
        hasBiz: hasEnumBiz,
        setupKey: setupEnumKey,
        resetKey: resetEnumKey
    }
}

export default EnumEntity;
