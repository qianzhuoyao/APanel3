import { Middleware } from "../type";

export const rollbackMiddleware: Middleware<any> = async (
  store,
  task,
  next
) => {
  const previousState = { ...store.state };
  try {
    await next();
  } catch (error) {
    console.error(`[Rollback Middleware] 错误发生，回滚到上一个有效状态`);
    store.state = previousState;
    store.notify();
  }
};
