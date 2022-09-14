/* 模拟状态 */
// 未知状态
export const IMITATE_UNKNOWN = "Unknown";

// 已经模拟，但是没有找到模拟结果
export const IMITATE_NO_RESULT = "None";

// 模拟进行中，还未完成
export const IMITATE_IN_PROGRESS = "Active";

// 模拟完成，结果成功
export const IMITATE_SUCCESS = "Success";

// 模拟完成，结果失败
export const IMITATE_RUN_FAIL = "Fail";

// 模拟查询过程中出现了错误
export const IMITATE_QUERY_ERROR = "failure";

/* 模拟子状态 */

// 模拟进行时中断，无法继续模拟，模型无法收敛，需要重新检查模型
export const SUB_IMITATE_INTERRUPT = "Incomplete";

// 模拟完成，结果可用，但是存在警告信息（ICM会抛出一些警告信息，说明模型中部分参数设置不合理）
export const SUB_IMITATE_WARNING = "Warnings";

// 模拟完成，结果成功
export const SUB_IMITATE_OK = "OK";
