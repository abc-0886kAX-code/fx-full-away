/*
 * @FilePath: \3D防汛作战\src\pages\flash-flood-defense\components\defense-county\shared\config.js
 * @Author: zhangyang
 * @Date: 2022-08-03 11:04:11
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-08-03 15:21:27
 * @Description: 
 */
// 时间选择器
export const TimeSelectProps = {
    anHour: {
        value: "1h",
        label: "1小时"
    },
    threeHours: {
        value: "3h",
        label: "3小时",
    },
    sixHours: {
        value: "6h",
        label: "6小时",
    },
    twelveHours: {
        value: "12h",
        label: "12小时",
    }
}

// 数据类型选择器
export const DataTypeSelectProps = {
    forecast: {
        label: "预报数据",
    },
    actual: {
        label: "实测数据",
    },
    manual: {
        label: "人工绘制",
    }
}

// 出图类型选择器
export const ImageTypeSelectProps = {
    level: {
        label: "风险等级图"
    },
    area: {
        label: "风险区域图"
    },
    threshold: {
        label: "风险阈值图"
    }
}
