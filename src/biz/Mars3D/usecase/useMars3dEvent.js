/*
 * @Author: zhangyang
 * @Date: 2022-04-28 16:51:12
 * @LastEditors: abc088_6kAX_code 86451477+abc-0886kAX-code@users.noreply.github.com
 * @LastEditTime: 2022-08-01 13:32:14
 * @Description: file content
 */
export function useMars3dEvent(events) {
    const gather = new Map();
    const bindEventType = Reflect.ownKeys(events);

    bindEventType.forEach((type) => gather.set(type, events[type]));

    const setupBind = (layer) => {
        layer.on(bindEventType, (target) => {
            const { type } = target;
            if (!gather.has(type)) return;

            gather.get(type)(target);
        });
    }

    return {
        setupBind
    }
}
