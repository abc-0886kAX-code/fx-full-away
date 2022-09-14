/*
 * @Author: zhangyang
 * @Date: 2022-04-26 15:11:22
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-05-24 12:50:42
 * @Description: file content
 */
import {
    unref,
    shallowRef
} from "@vue/composition-api";
import { LayerUtil } from "mars3d";
import { flake } from "maggot-utils";

import { addLayer, handlerLayerConfig } from "./useLayerSetup";

const { VUE_APP_ROOT_LAYERID } = process.env;
const getLayerOptions = {
    basemaps: false,
    layers: false
};

function eachGather(gather, handler) {
    Reflect.ownKeys(gather).forEach((key) => handler(gather[key], key));
}

function handlerGather(layers, mapview, handler) {
    layers.forEach((layer) => {
        const find = () => mapview.getLayer(layer.name, "name");
        const show = () => find().show = true;
        const hide = () => find().show = false;
        const clear = () => {
            const l = find();
            l.clear ? l.clear(true) : l.remove(true);
        };

        handler(layer.name, {
            id: layer.id,
            find,
            show,
            hide,
            clear,
            switch: () => find().show = !find().show
        });
    });
}

function releaseGather(layer) {
    layer.clear();
}

export function useLayer(mapview) {
    const layers = unref(mapview).getLayers(getLayerOptions);
    const gather = shallowRef({});

    const setupGather = (name, layer) => {
        gather.value[name] = layer;
    };
    const setupLayer = (conf) => {
        const id = flake.gen();
        const layer = handlerLayerConfig({ ...conf, id });
        addLayer(layer, unref(mapview));
        handlerGather([layer], unref(mapview), setupGather);
        return layer;
    }
    const destroyLayer = () => {
        eachGather(unref(gather), releaseGather);
    }

    handlerGather(layers, unref(mapview), setupGather);

    return {
        gather,
        setupLayer,
        destroyLayer
    }
}