import { Application } from "pixi.js";

/**
 * 创建单例
 * @param initializer
 * @returns
 */
const createSingle = <C>(initializer: () => C): (() => C) => {
  let instance: C | null = null;
  return () => {
    if (instance === null) {
      instance = initializer();
    }
    return instance;
  };
};
/**
 * 获取app
 * @returns
 */
export const getApp = createSingle(() => {
  const app = null as Application | null;
  return { app };
});
/**
 * 设置app
 * @param app
 */
export const setApp = (app: Application | null) => {
  getApp().app = Object.seal(app);
};
