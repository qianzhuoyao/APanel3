import { Application } from "pixi.js";

interface SceneInstance {
  instance: Application;
  destroy: () => void;
}

export const createSceneInstance = (
  initializer: () => Application
): (() => SceneInstance) => {
  let instance: SceneInstance | null = null;
  return () => {
    if (!instance) {
      const app = initializer();
      console.log(app, "app");
      instance = {
        instance: app,
        destroy: () => {
          instance = null; // 重置实例
        },
      };
    }
    return instance;
  };
};
