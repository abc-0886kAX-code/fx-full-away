/*
 * @Author: zhangyang
 * @Date: 2022-04-15 10:27:34
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-15 10:36:15
 * @Description: file content
 */
import { isFunction } from 'lodash';
export function useStateMachine() {
    const stateMachine = new Map();
    const stateMachineGet = (key) => {
        return stateMachine.has(key)
            ? stateMachine.get(key)
            : false;
    }
    const stateMachineSet = (key, data) => {
        return stateMachine.has(key)
            ? stateMachineGet(key)
            : stateMachine.set(key, data);
    }
    const stateMachineDel = (key) => {
        return stateMachine.has(key)
            ? stateMachine.delete(key)
            : false;
    }
    const stateMachineEvent = (handler, data) => {
        const { target } = data;

        isFunction(target[handler]) && target[handler](data);
    }
    const stateMachineRun = (func) => {
        stateMachine.forEach((target) => func(target));
    }

    return {
        stateMachineGet,
        stateMachineSet,
        stateMachineDel,
        stateMachineEvent,
        stateMachineRun
    }
}