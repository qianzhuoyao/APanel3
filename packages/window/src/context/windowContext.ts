import { createSingle, Rxjs } from "@repo/lib";
import { IWindowContext } from "./windowContext.type";

const windowContext = () => {
  return createSingle(() => {
    const window: Partial<IWindowContext> = {};
    return {
      window,
    };
  });
};

export const _initWindowContext = windowContext();
