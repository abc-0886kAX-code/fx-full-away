/*
 * @FilePath: \socket-service\src\shared\event.js
 * @Author: maggot-code
 * @Date: 2022-07-14 12:39:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-07-14 13:28:38
 * @Description:
 */
// 连接到命名空间（包括成功重新连接）时的状态
export const SOCKET_CONNECT_STATUS = 'connect';

// 连接断开时的状态
export const SOCKET_DISCONNECT_STATUS = 'disconnect';

// 连接出错时的状态
export const SOCKET_CONNECT_ERROR_STATUS = 'connect_error';

// 成功重新连接时的状态
export const SOCKET_IO_RECONNECT_STATUS = 'reconnect';

// 尝试重新连接时的状态
export const SOCKET_IO_RECONNECT_ATTEMPT = 'reconnect_attempt';

// 重新连接出现错误时的状态
export const SOCKET_IO_RECONNECT_ERROR = 'reconnect_error';

// 重新连接超过最大尝试数量依然无法连接时的状态
export const SOCKET_IO_RECONNECT_FAILED = 'reconnect_failed';

// 从服务端接收到心跳包时的状态
export const SOCKET_IO_PING_STATUS = 'ping';

// 连接服务端时出现错误
export const SOCKET_IO_ERROR_STATUS = 'error';

// 消息接收时的状态
export const SOCKET_MESSAGE_STATUS = 'message';
