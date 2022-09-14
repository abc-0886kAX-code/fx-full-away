/*
 * @FilePath: \socket-service\src\shared\error_status.js
 * @Author: maggot-code
 * @Date: 2022-07-14 11:18:45
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-07-14 13:42:44
 * @Description:
 */
// 断开状态 服务器主动断开
export const DISCONNECT_SERVER_CLOSE = 'io server disconnect';

// 断开状态 客户端主动断开
export const DISCONNECT_CLIENT_CLOSE = 'io client disconnect';

// 断开状态 心跳超时
export const DISCONNECT_HEART_TIMEOUT = 'ping timeout';

// 断开状态 连接被动关闭(服务端把客户端踢了,断网了,网络状态问题)
export const DISCONNECT_FORCE_CLOSED = 'transport close';

// 断开状态 连接出现错误(服务端错误)
export const DISCONNECT_ERROR = 'transport error';
