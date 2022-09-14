/*
 * @FilePath: \3D防汛作战\src\biz\User\usecase\useUserLocation.js
 * @Author: zhangyang
 * @Date: 2022-06-22 15:24:10
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-06-23 11:19:17
 * @Description: 
 */
import { getUserIdentity } from "../entity/Identity";
import {accordIdentityToLocation} from "../entity/Location";
import { unref } from "@vue/composition-api";

export default function useUserLocation(mapview) {
    const Identity = getUserIdentity();
    
    const resetMapviewLocation = () => {
        const {cood,options} = accordIdentityToLocation(Identity);
        unref(mapview).flyToPoint(cood, options);
    }
    
    return {
        resetMapviewLocation
    }
}
