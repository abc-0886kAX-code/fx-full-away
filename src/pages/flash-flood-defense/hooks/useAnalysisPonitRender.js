/*
 * @Author: abc088_6kAX_code 86451477+abc-0886kAX-code@users.noreply.github.com
 * @Date: 2022-08-01 13:12:42
 * @LastEditors: abc088_6kAX_code 86451477+abc-0886kAX-code@users.noreply.github.com
 * @LastEditTime: 2022-08-01 16:40:16
 * @FilePath: \防汛大屏\src\pages\flash-flood-defense\components\defense-pinggu\components\flash-flood-warning\composables\Analysis\usecase\useAnalysisPonitRender.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { unref, onBeforeUnmount, ref } from '@vue/composition-api';
import { useLayer } from "@/biz/Mars3D/usecase/useLayer";
import { useLocation } from "@/biz/Mars3D/usecase/useLocation";
import { setupBillboardShape } from "@/biz/Mars3D/usecase/useBillboard";
import cunzi from "@/assets/icon/cunzi.png";
import { graphic } from "mars3d";

const { BillboardEntity } = graphic;

const tableColumn = [
  {
    label: "FID",
    prop: "fid",
    mold: "default",
    align: "center",
    width: 50,
  },
  {
    label: "村名",
    prop: "stnm",
    mold: "link",
    formatLink: "location",
    align: "center",
  },
  {
    label: "降雨差值",
    prop: "r",
    mold: "default",
    align: "center",
  },
  {
    label: "危险等级",
    prop: "dangerlevel",
    mold: "default",
    align: "center",
  },
];

const setupFloat = (target) => {
  const { attr } = target.graphic;
  return tableColumn.map((item) => {
    const { label, prop: field } = item;
    return {
      label,
      field,
      text: attr[field] ?? "--",
    };
  });
};

const setupConePoint = (attributes) => {
  const { lgtd: longitude, lttd: latitude, stnm: name, fid: id } = attributes;
  const shape = setupBillboardShape({
    longitude,
    latitude,
    image: cunzi,
  });

  return new BillboardEntity({
    name,
    id,
    attr: {
      ...attributes,
      dialogName: "dialog-alert-generation",
      setupFloat,
    },
    ...shape,
  });
};

export function useAnalysisPonitRender(mapview) {
  const basicList = ref([]);
  const setupBasicList = (data) => basicList.value = data;
  const { gather } = useLayer(mapview);
  const { find, clear } = useLocation(unref(gather).HomePointLayer);
  const layer = find();

  const setupPonitRender = (data) => {
    setupBasicList(data);
    const points = data.map(setupConePoint);
    clear();
    layer.addGraphic(points);
    layer.flyTo();
    return { points };
  }
  onBeforeUnmount(() => {
    clear();
  })
  return { basicList, setupPonitRender, clear }
}