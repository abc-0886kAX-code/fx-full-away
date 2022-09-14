/*
 * @Author: zhangyang
 * @Date: 2021-09-08 13:29:20
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-09-14 16:21:52
 * @Description: file content
 */
import { reactive } from '@vue/composition-api';
import { isFunction } from 'lodash';

class Highlight {
    constructor() {
        this.highlightAlone = reactive({});
    }
    showSign(arcMap, layer, graphic) {
        const { mapView } = arcMap;
        mapView.whenLayerView(layer).then(layerView => {
            this.hideSign();

            this.highlightAlone = layerView.highlight(graphic);
        }).catch()
    }
    hideSign() {
        const { remove } = this.highlightAlone;

        isFunction(remove) && remove();

        this.highlightAlone = {};

        return false;
    }
}

const useHighlight = () => {
    const highlight = new Highlight();

    return {
        ...highlight,
        showSign: highlight.showSign,
        hideSign: highlight.hideSign
    }
}

export default useHighlight;