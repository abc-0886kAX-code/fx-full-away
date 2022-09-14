/*
 * @FilePath: \3D防汛作战\src\biz\Socket\usecase\useSocketMessage.js
 * @Author: zhangyang
 * @Date: 2022-07-14 14:43:53
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-07-14 14:48:16
 * @Description: 
 */
import { inject } from "@vue/composition-api";
import { SOCKET_CLIENT_NAME } from "../shared/context";

export function useSocketMessage() {
    const socketClient = inject(SOCKET_CLIENT_NAME, {
        socket: null,
        setupSocketMessage: () => { }
    });

    return socketClient;
}

export default useSocketMessage;
