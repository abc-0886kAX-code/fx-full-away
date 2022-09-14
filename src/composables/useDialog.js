/*
 * @Author: zhangyang
 * @Date: 2022-04-14 14:31:21
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-11 14:39:44
 * @Description: file content
 */
import { provide, computed, onBeforeUnmount, reactive, ref, watchEffect } from '@vue/composition-api';
import { Sign } from "@/biz/share/entify/Sign";

export function useDialog(provideName = "dialog") {
    const { sign: noticeKey, setupSign: setupNoticeKey } = Sign();
    const key = ref(Date.now());
    const bodyName = ref("ytxd-empty");
    const visable = ref(false);
    const loading = ref(true);
    const title = ref("防汛作战业务化应用平台");
    const props = ref({});
    const style = reactive({
        width: "70%",
        height: "70vh"
    });

    const setupKey = () => key.value = Date.now();
    const setupProps = (data) => props.value = data;
    const setupBodyName = (name = "ytxd-empty") => bodyName.value = name;
    const setupVisable = (state) => visable.value = state;
    const setupLoading = (state) => loading.value = state;
    const setupTitle = (text = "防汛作战业务化应用平台") => title.value = text;
    const setupStyle = (w, h) => {
        style.width = w ?? "70%";
        style.height = h ?? "70vh";
    }
    const setupEmitDialog = (options) => {
        const { name, title, size, props } = options;
        const { w, h } = size ?? { w: "70%", h: "70vh" };
        setupBodyName(name ?? "ytxd-empty");
        setupTitle(title ?? "防汛作战业务化应用平台");
        setupStyle(w, h);
        setupProps(props);
        setupKey();
        setupVisable(true);

        return options;
    }

    const dialogWidth = computed(() => {
        return style.width
    })

    const dialogHeight = computed(() => {
        return style.height
    })

    const visableWatch = watchEffect(() => {
        if (!visable.value) setupLoading(true);
    });

    provide(provideName, {
        dialogNoticeKey: noticeKey,
        dialogKey: key,
        dialogSetupNoticeKey: setupNoticeKey,
        dialogComponent: setupBodyName,
        dialogOpen: () => setupVisable(true),
        dialogClose: () => setupVisable(false),
        dialogLoadStart: () => setupLoading(true),
        dialogLoadEnd: () => setupLoading(false),
        dialogHandler: setupEmitDialog
    });

    onBeforeUnmount(() => {
        visableWatch();
    });

    return {
        dialogNoticeKey: noticeKey,
        dialogKey: key,
        dialogVisable: visable,
        dialogLoading: loading,
        dialogTitle: title,
        dialogWidth: dialogWidth,
        dialogHeight: dialogHeight,
        dialogName: bodyName,
        dialogProps: props,
        dialogSetupNoticeKey: setupNoticeKey,
        dialogComponent: setupBodyName,
        dialogOpen: () => setupVisable(true),
        dialogClose: () => setupVisable(false),
        dialogLoadStart: () => setupLoading(true),
        dialogLoadEnd: () => setupLoading(false),
        dialogHandler: setupEmitDialog,
    }
}
