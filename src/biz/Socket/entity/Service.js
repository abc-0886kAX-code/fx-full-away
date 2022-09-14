/*
 * @FilePath: \socket-service\src\entity\Service.js
 * @Author: maggot-code
 * @Date: 2022-07-14 11:08:45
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-07-14 11:28:29
 * @Description:
 */
export const serviceURI = window.location.origin;

export const servicePath = '/socket.io/';

export const serviceQuery = () => {
    return {};
};

export const Service = {
    path: servicePath,
    setupQuery: serviceQuery,
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    transports: ['websocket'],
};

export function setupService(props = {}) {
    const { url } = props ?? {};
    const serviceProps = Object.assign({}, props ?? {}, Service);

    return {
        url: url ?? serviceURI,
        options: {
            query: serviceProps.setupQuery(),
            ...serviceProps,
        },
    };
}

export default setupService;
