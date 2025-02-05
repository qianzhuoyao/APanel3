import { maxRetries, retryDelay } from "../config";
import { Middleware } from "../type";

export const logAndRetryMiddleware: Middleware<any> = async (store, task, next) => {
    const previousState = { ...store.state }; 
    let attempt = 0;

    const logError = (error: any) => {
        console.error(`[错误日志] 错误发生！任务：${task.mutationName}, 错误信息：`, error);
    };

    const executeWithRetry = async () => {
        while (attempt < (task.maxRetries || maxRetries)) {
            try {
                await next(); 
                return;
            } catch (error) {
                attempt++;
                logError(error);

                if (attempt >= (task.maxRetries || maxRetries)) {
                    console.error(`[重试失败] 最大重试次数已达，任务失败！`);
                    store.state = previousState;
                    store.notify();
                    return;
                }

                console.log(`[重试机制] 等待 ${retryDelay} 毫秒后重试...`);
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
        }
    };

    await executeWithRetry();
};