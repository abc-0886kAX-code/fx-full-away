/* 模拟状态 */

// 未知状态
export const IMITATE_UNKNOWN_TIPS = {
    type: "info",
    tips: "未知状态 | 暂无描述"
};

// 已经模拟，但是没有找到模拟结果
export const IMITATE_NO_RESULT_TIPS = {
    type: "warning",
    tips: "已经模拟 | 没有找到模拟结果"
};

// 模拟进行中，还未完成
export const IMITATE_IN_PROGRESS_TIPS = {
    type: "",
    tips: "模拟进行中 | 未完成"
};

// 模拟完成，结果成功
export const IMITATE_SUCCESS_TIPS = {
    type: "success",
    tips: "模拟完成 | 成功"
};

// 模拟完成，结果失败
export const IMITATE_RUN_FAIL_TIPS = {
    type: "danger",
    tips: "模拟完成 | 失败"
};

// 模拟查询过程中出现了错误
export const IMITATE_QUERY_ERROR_TIPS = {
    type: "danger",
    tips: "查询失败 | 查询模拟进度时出现了错误"
};

/* 模拟子状态 */
// 模拟进行时中断，无法继续模拟，模型无法收敛，需要重新检查模型
export const SUB_IMITATE_INTERRUPT_TIPS = {
    type: "danger",
    tips: "模拟中断 | 无法继续进行，请重新检查模型"
};

// 模拟完成，结果可用，但是存在警告信息（ICM会抛出一些警告信息，说明模型中部分参数设置不合理）
export const SUB_IMITATE_WARNING_TIPS = {
    type: "warning",
    tips: "模拟完成 | 可用，但存在警告"
};

// 模拟完成，结果成功
export const SUB_IMITATE_OK_TIPS = {
    type: "success",
    tips: "模拟完成 | 结果成功"
};
