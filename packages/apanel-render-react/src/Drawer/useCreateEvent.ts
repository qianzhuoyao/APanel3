import { ISceneType } from "../type";
import { drag } from "@repo/core";
export const defaultCreateBlockEvent = (scene: ISceneType["target"]) => {
  return drag({
    target: scene,
  }).subscribe((e) => {
    console.log(e, "eor");
  });
};
