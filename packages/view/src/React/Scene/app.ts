import { Application } from "pixi.js";
import { globalSingle } from "../../Window/globalSingle";

/**
 * 获取app
 * @returns
 */
export const getApp = () => {
  return { app: globalSingle().app };
};
/**
 * 设置app
 * @param app
 */
export const setApp = (newApp: Application | null) => {
  globalSingle().app = Object.seal(newApp);
};
