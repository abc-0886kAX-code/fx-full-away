/*
 * @Author: zhangxin
 * @Date: 2022-07-15 10:41:14
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-09-14 10:02:58
 * @Description:
 */
export function getBasinFloodMenu() {
    return {
        defaultID: '5c3cf3197fd34c5b8a6b7701af1a4cf0',
        menu: [
            {
                id: '5c3cf3197fd34c5b8a6b7701af1a4cf0',
                label: '流域洪水',
                component: 'basin-flood-default',
                fragment: true,
                power: [0],
                toport: '',
            },
            {
                id: '4C447F51-199B-4D66-8B28-25449E152CD3',
                label: '潮白河流域',
                component: 'basin-cbh',
                power: [0],
                toport: '',
            },
            {
                id: 'C8A63CDE-698E-4066-AAA0-412295FC575A',
                label: '蓟运河流域',
                component: 'basin-jyh',
                power: [0],
                toport: '',
            },
            {
                id: '101687B6-B4DD-414C-AC7E-CBD727282EA8',
                label: '北运河流域',
                component: 'basin-byh',
                power: [0],
                toport: '',
            },
            {
                id: '388536F7-C860-4F39-997C-D4A1CA8842C7',
                label: '永定河流域',
                component: 'basin-ydh',
                power: [0],
                toport: '',
            },
            {
                id: '2D3046E7-3C08-4EC3-AD90-8F05D2DBE5C1',
                label: '大清河流域',
                component: 'basin-dqh',
                power: [0],
                toport: '',
            },
        ],
    };
}
