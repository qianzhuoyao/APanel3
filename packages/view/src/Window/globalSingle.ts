import { Application } from "pixi.js";
import { createSingle } from "../Libs/createSingle";

interface InitGlobalType {
  app: Application | null;
}

const initGlobel: InitGlobalType = {
  app: null,
};

export const globalSingle = createSingle(() => {
  return initGlobel;
});
