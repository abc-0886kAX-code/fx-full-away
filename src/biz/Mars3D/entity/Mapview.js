/*
 * @Author: zhangyang
 * @Date: 2022-04-25 09:19:13
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-05 10:05:54
 * @Description: file content
 */
import { flake } from "maggot-utils";
import {
    EventType, Map
} from "mars3d";

export class Mapview {
    _id = flake.gen();
    view = null;
    config = {}
    constructor(config) {
        this.config = config;
    }
    proof(id) {
        return this._id === id;
    }
    onReady(handler) {
        this.view.on(EventType.load, handler);
    }
    install(mapbox) {
        this.view = new Map(mapbox, this.config);

        return this.view;
    }
    uninstall() {
        this.view.destroy();
        this.view = null;
    }
}