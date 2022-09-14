/*
 * @Author: zhangyang
 * @Date: 2022-06-06 17:22:52
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-31 17:17:46
 * @Description: file content
 */
import { computed, unref, shallowRef, ref } from "@vue/composition-api";
import { isArray, isFunction, isString } from "lodash";
const setupAsyncData = async (target, data) => {
    target.value = isFunction(data) ? await data() : data;
}

const ruleMap = {
    "string": (value) => (isString(value) || isArray(value)) && value.length > 0,
    "array": (value) => isArray(value) && value.length > 0
};

// 校验锁
export function useVerificationLock(message = "必填项", lockStatus = false) {
    const lock = ref(lockStatus);

    const validator = (rule, value, callback) => {
        if (!unref(lock)) {
            lock.value = true;
            callback();
            return;
        }

        const { type } = rule;
        const ruleFunc = ruleMap[type];

        if (!isFunction(ruleFunc)) return callback();

        ruleFunc(value) ? callback() : callback(new Error(message));
    }

    return {
        required: true,
        message,
        validator,
    }
}

export function useSearchInput(field, options = {}) {
    const { ui, value, leader, worker, rule } = options;
    const valueRef = ref(value ?? "");
    const schema = computed(() => ({
        field,
        mold: "text",
        componentName: "mg-input",
        value: valueRef.value,
        uiSchema: ui ?? {},
        ruleSchema: rule ?? [],
        leaderTag: leader ?? {},
        workerTag: worker ?? []
    }));
    const setupValue = async (value) => await setupAsyncData(valueRef, value);
    return {
        schema,
        setupValue
    }
}

export function useSearchNumber(field, options = {}) {
    const { ui, value, leader, worker, rule } = options;
    const valueRef = ref(value ?? "");
    const schema = computed(() => ({
        field,
        mold: "number",
        componentName: "mg-input",
        value: valueRef.value,
        uiSchema: ui ?? {},
        ruleSchema: rule ?? [],
        leaderTag: leader ?? {},
        workerTag: worker ?? []
    }));
    const setupValue = async (value) => await setupAsyncData(valueRef, value);
    return {
        schema,
        setupValue
    }
}

export function useSearchSelect(field, options = {}) {
    const { ui, value, valueField, textField, lib, leader, worker, rule, enums } = options;

    const enumsRef = shallowRef(enums ?? []);
    const valueRef = ref(value ?? "");
    const schema = computed(() => ({
        field,
        mold: "default",
        componentName: "mg-select",
        value: valueRef.value,
        dataSchema: {
            lib: lib ?? {},
            enums: enumsRef.value,
            valueField,
            textField,
        },
        uiSchema: ui ?? {},
        ruleSchema: rule ?? [],
        leaderTag: leader ?? {},
        workerTag: worker ?? []
    }));

    const setupEnums = async (data) => await setupAsyncData(enumsRef, data);
    const setupValue = async (value) => await setupAsyncData(valueRef, value);

    return {
        schema,
        setupEnums,
        setupValue
    }
}

export function useSearchDate(field, mold, options = {}) {
    const { ui, value, leader, worker, rule } = options;

    const valueRef = ref(value ?? "");
    const uiSchema = ref(ui ?? {});

    const schema = computed(() => ({
        field,
        componentName: "mg-time",
        mold: mold ?? "datetime",
        value: valueRef.value,
        uiSchema: unref(uiSchema),
        ruleSchema: rule ?? [],
        leaderTag: leader ?? {},
        workerTag: worker ?? []
    }));

    const setupValue = async (value) => await setupAsyncData(valueRef, value);
    const setupUISchema = async (ui) => await setupAsyncData(uiSchema, ui);

    return {
        schema,
        setupValue,
        setupUISchema
    }
}
