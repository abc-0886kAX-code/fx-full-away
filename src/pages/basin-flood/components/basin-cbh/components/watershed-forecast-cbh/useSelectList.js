/*
 * @Author: zhangxin
 * @Date: 2022-06-22 16:15:29
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-22 13:19:04
 * @Description: 
 */

import { icmQueryUsableSimulation } from "@/api/icm/run.api";
import YuLiang from '@/assets/icon/ssjc-yuliang.png';


const selectList = [
    {
        "key": "flood-simulation",
        "label": "快速预报",
        "status": false,
        "legend": "",
        "children": [
            {
                "key": "rainfall-site",
                "label": "特征断面",
                "status": false,
                "legend": YuLiang,
                "children": []
            }
        ]
    },
    {
        "key": "icm-model-prediction",
        "label": "ICM模型预报",
        "status": false,
        "legend": "",
        "children": [
            {
                "key": "icm-model-prediction-item",
                "label": "ICM模型预报",
                "status": false,
                "legend": YuLiang,
                "children": []
            },
        ]
    }
]

export function useSelectList() {

    const executeQuery = async () => {
        try {
            const data = await icmQueryUsableSimulation().then(setupSelectList(selectList));
            return data;
        } catch (error) {
            return new Promise((resolve, reject) => {
                resolve([
                    {
                        Duration: 120,
                        ResultsMultiplier: 5,
                        name: '测试',
                        id: '47',
                        step: 60
                    }
                ])
            }).then(setupSelectList(selectList))
        }
    };

    const setupSelectList = (selectList) => (data) => {
        return selectList.map(el => {
            if (el.key === "icm-model-prediction") {
                el.children = data.map(item => {
                    return {
                        "key": "icm-model-prediction-item",
                        "label": item.name,
                        "status": false,
                        "legend": YuLiang,
                        "children": [],
                        "props": item
                    }
                })
            }
            return el;
        })
    }

    return {
        executeQuery
    }
}