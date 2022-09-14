/*
 * @Author: zhangxin
 * @Date: 2022-04-22 15:00:25
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-11 13:24:27
 * @Description: 
 */
import { computed, onBeforeUnmount, ref, unref, watch, watchEffect } from '@vue/composition-api';
import { isNil } from 'lodash';

export function useCharts(props) {

    // echarts实例
    let charts = null;
    // dom元素
    const chartsRefs = ref();
    const key = ref(Date.now());
    const setupKey = () => key.value = Date.now();
    const loading = ref(true)
    const options = ref({})

    const isData = computed(() => {
        return unref(options)?.dataset?.source?.length > 0;
    });

    const nilChartRefs = computed(() => {
        return isNil(unref(chartsRefs));
    });

    const setupOptions = (source = {}) => {
        options.value = source;
        setupKey();
    }
    const setupLoading = (state) => loading.value = state;


    watch(key, () => {
        setupCharts(props.chartsRnder)
    });

    watch(nilChartRefs, (newVal) => {
        !newVal && setupCharts(props.chartsRnder)
    });

    watchEffect(() => {
        setupOptions(props.chartsOptions);
    });

    const resizeHandler = () => {
        charts && charts.resize()
    }

    const setupCharts = (renderFunc) => {
        setupLoading(true)

        !isNil(charts) && charts.dispose();

        if (!isData.value || nilChartRefs.value) return setupLoading(false);

        charts = renderFunc(chartsRefs.value, options.value);
        window.addEventListener('resize', resizeHandler, true)
        setupLoading(false)
    }

    const destroyListener = () => {
        window.removeEventListener('resize', resizeHandler, true)
    }

    onBeforeUnmount(() => {
        destroyListener()
    })



    return {
        isData,
        chartsRefs,
        chartsKey: key,
        chartsLoading: loading,
        chartsLoadEnd: () => setupLoading(false),
        setupOptions
    }
}