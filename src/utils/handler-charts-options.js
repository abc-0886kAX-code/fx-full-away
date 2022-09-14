/*
 * @Author: zhangxin
 * @Date: 2022-05-06 13:07:43
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-27 16:44:32
 * @Description: 
 */

const xTags = ['itemdate']

// 处理对比折线图配置
export const handlerContrastLineOptions = (options, data) => {
    if (data.length <= 0) return

    options.dataset.source = data;

    const seriesName = Object.keys(data[0]);

    const filterTags = seriesName.filter(item => xTags.indexOf(item) === -1);

    options.dataset.dimensions = seriesName;

    options.legend.data = filterTags;

    options.series = filterTags.map(item => {
        return {
            name: item,
            type: 'line',
            yAxisIndex: 0
        }
    })

    return options
}

//使用数据集形式渲染
export const handlerDatasetOptions = (options, data) => {
    if (data.length <= 0) return;

    options.dataset.source = data;

    return options
}