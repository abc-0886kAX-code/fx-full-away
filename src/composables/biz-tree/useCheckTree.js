/*
 * @FilePath: \3D防汛作战\src\composables\biz-tree\useCheckTree.js
 * @Author: zhangyang
 * @Date: 2022-06-17 09:55:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-06 10:51:56
 * @Description: 
 */
import { isColor } from "@/utils";
import {
    ref, unref
} from "@vue/composition-api";
import { isBoolean, isNil, isNumber, isObject, isString } from "lodash";
import { flake } from "maggot-utils";

export function transformTree(indexes, source = []) {
    return source.map((node, index) => {
        const { children } = node;
        const cellColumn = setupColumn(indexes, index, node);
        const { node: cell } = cellColumn;

        if (children.length > 0) {
            cellColumn.children = transformTree(cell, children);
        }

        return cellColumn;
    });
}

export function setupColumn(indexes, index, options = {}) {
    return Object.assign(options, {
        node: setupNode(indexes, index),
        key: setupKey(options),
        componentName: setupKey(options),
        label: setupLabel(options),
        status: setupStatus(options),
        legend: setupLegend(options),
        isColor: setupIsColor(options),
        props: setupProps(options),
        children: [],
        isRender: true,
        signage: flake.gen()
    })
}


export function setupKey({ key }) {
    const factor = !isNil(key) && (isString(key) || isNumber(key));

    return factor ? key : flake.gen();
}

export function setupLabel({ label }) {
    const factor = !isNil(label) && isString(label);

    return factor ? label : "节点"
}

export function setupStatus({ status }) {
    const factor = !isNil(status) && isBoolean(status);

    return factor ? status : false
}

export function setupLegend({ legend }) {
    return legend;
    // const factor = !isNil(legend) && isColor(legend);

    // return factor ? legend : "#fff"
}

export function setupIsColor({ legend }) {
    return !isNil(legend) && isColor(legend);
}

export function setupProps({ props }) {
    const factor = !isNil(props) && isObject(props);

    return factor ? props : {}
}

export function setupNode(indexes, index) {
    return `${indexes}-${index}`;
}

export function addNode(node) {
    const { isRender } = node;

    if (!isRender) return;

    return Object.assign(node, {
        render: true
    });
}

export function delNode(datasource, node) {
    const { key: baseKey } = node;

    return unref(datasource).filter(({ key }) => {
        return baseKey !== key;
    });
}

export default function useCheckTree() {
    const treeDataSource = ref([]);

    function treeAddNode(node) {
        treeDataSource.value.push(addNode(node));
    }

    function treeDelNode(node) {
        treeDataSource.value = delNode(treeDataSource, node);
    }

    return {
        treeDataSource,
        transformTree,
        treeAddNode,
        treeDelNode
    }
}
