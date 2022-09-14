/*
 * @Author: zhangxin
 * @Date: 2022-07-11 15:21:23
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-03 11:24:03
 * @Description:
 */
import { computed, onBeforeUnmount, ref, unref } from "@vue/composition-api";

export function useEchartsRotation() {
  let timer;
  const key = ref(+new Date());
  const baseList = ref([]);
  const baseListLength = computed(() => unref(baseList).length);
  const indexcache = ref(unref(baseListLength) - 1);
  const setupBaseList = (list) => (baseList.value = list);
  const setupKey = () => (key.value = +new Date());
  const index = computed({
    get() {
      return unref(indexcache);
    },
    set(value) {
      const val = toLimit(value);
      indexcache.value = val;
    },
  });
  const datasouce = computed(() => unref(baseList)[unref(index)]);

  function toLimit(value) {
    if (value >= unref(baseListLength)) return 0;
    return value;
  }

  function initIndexcache() {
    index.value = unref(indexcache);
  }

  function setupStartTime() {
    setupClearTime();
    index.value++;
    setupKey();
    if (process.env.NODE_ENV === "production" && unref(baseListLength) > 1) {
      timer = setTimeout(setupStartTime, 3000);
    }
  }

  function setupClearTime() {
    if (process.env.NODE_ENV === "production" && unref(baseListLength) > 1) {
      clearTimeout(timer);
    }
  }

  onBeforeUnmount(() => {
    setupClearTime();
  });

  return {
    key,
    setupBaseList,
    currentIndex: index,
    currentDatasouce: datasouce,
    datasouceLength: baseListLength,
    initIndexcache,
    setupStartTime,
    setupClearTime,
  };
}
