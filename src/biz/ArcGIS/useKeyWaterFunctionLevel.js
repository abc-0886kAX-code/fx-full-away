/*
 * @Author: zhangyang
 * @Date: 2022-05-12 17:16:50
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-05-12 17:19:31
 * @Description: file content
 */
export const levelMapping = {
    1: "#98DAF3",
    2: "#689B40",
    3: "#DD8F3D",
    4: "#F4646D",
    5: "#FE0B07",
    other: "#98DAF3"
};

export const setupLevel = (level) => {
    return levelMapping[level] ?? levelMapping.other;
}