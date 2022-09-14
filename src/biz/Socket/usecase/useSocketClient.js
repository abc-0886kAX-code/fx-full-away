/*
 * @FilePath: \防汛大屏\src\biz\Socket\usecase\useSocketClient.js
 * @Author: maggot-code
 * @Date: 2022-07-14 11:07:21
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-08-25 17:56:40
 * @Description:
 */
import io from 'socket.io-client';
// import { io } from 'socket.io-client';
import { provide, onMounted, onBeforeUnmount } from '@vue/composition-api';
import { setupService } from '../entity/Service';
import { SOCKET_CLIENT_NAME } from '../shared/context';

import {
    SOCKET_DISCONNECT_STATUS,
    // SOCKET_IO_RECONNECT_STATUS,
    // SOCKET_IO_RECONNECT_ATTEMPT,
    SOCKET_IO_RECONNECT_FAILED,
    // SOCKET_IO_PING_STATUS,
    SOCKET_IO_ERROR_STATUS,
    SOCKET_MESSAGE_STATUS,
} from '../shared/event';
import {
    DISCONNECT_SERVER_CLOSE,
    DISCONNECT_CLIENT_CLOSE,
    DISCONNECT_HEART_TIMEOUT,
    DISCONNECT_ERROR,
} from '../shared/error_status';

export function useSocketClient(props) {
    const socketMessage = new Map();
    const { url, options } = setupService(props);
    const socket = io(url, options);

    function setupSocketMessage(type, callback) {
        socketMessage.set(type, callback);
    }

    socket.on(SOCKET_DISCONNECT_STATUS, reason => {
        if (reason === DISCONNECT_SERVER_CLOSE || reason === DISCONNECT_HEART_TIMEOUT) {
            socket.connect();
            return;
        }

        if (reason === DISCONNECT_CLIENT_CLOSE || reason === DISCONNECT_ERROR) {
            socket.disconnect();
            return;
        }
    });

    socket.on(SOCKET_MESSAGE_STATUS, message => {
        const { type, props } = message;
        if (!socketMessage.has(type)) return;
        const handler = socketMessage.get(type);
        handler(props ?? {});
        return;
    });

    // socket.io.on(SOCKET_IO_RECONNECT_STATUS, (attempt) => {
    //     console.log(`socket reconnect: ${attempt}`);
    // });

    // socket.io.on(SOCKET_IO_RECONNECT_ATTEMPT, (attempt) => {
    //     console.log(`socket reconnect attempt: ${attempt}`);
    // });

    socket.io.on(SOCKET_IO_RECONNECT_FAILED, () => {
        console.log(`socket reconnect failed`);
        socket.disconnect();
    });

    socket.io.on(SOCKET_IO_ERROR_STATUS, error => {
        console.log(`socket error: ${error.type}`);
    });

    provide(SOCKET_CLIENT_NAME, {
        socket,
        setupSocketMessage,
    });

    onMounted(() => {
        socket.connect();
    });

    onBeforeUnmount(() => {
        socketMessage.clear();
        socket.disconnect();
    });

    return {
        socket,
        setupSocketMessage,
    };
}

export default useSocketClient;
