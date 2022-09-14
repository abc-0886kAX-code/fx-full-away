/*
 * @Author: zhangyang
 * @Date: 2022-06-07 10:33:53
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-08 12:04:04
 * @Description: file content
 */
import { isArray } from "lodash";
import { unref, ref, computed } from "@vue/composition-api";
import { setupDefault } from "./share";

const defaultQuery = setupDefault({
    prop: "tm",
    order: "ASC",
    current: 1,
    size: 10,
    pageid: -1
});

function setupArrayParams(searchParams) {
    const params = {};

    for (const key in searchParams) {
        const value = searchParams[key];
        params[key] = isArray(value) ? value.join(',') : value;
    }

    return params;
}

export function useFactor(options) {
    const config = defaultQuery(options);
    const query = ref(config);
    const body = ref({});

    const factor = computed({
        get() {
            return {
                query: unref(query),
                body: unref(body)
            }
        },
        set(response) {
            query.value = defaultQuery(Object.assign({}, config, response.query));
            body.value = setupArrayParams(response.body);
        }
    });

    function setupQuery(response = {}) {
        query.value = defaultQuery(Object.assign({}, config, response));
        return unref(factor);
    }

    function setupBody(response) {
        body.value = setupArrayParams(response);
        return unref(factor);
    }

    return {
        query,
        body,
        factor,
        setupQuery,
        setupBody
    }
}