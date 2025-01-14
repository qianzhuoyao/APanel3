import type { ISceneProp } from "../Scene/type";
import { ACTION_MODE } from "./actionConstant";

export type IRootProp = ISceneProp;

export type IActionMode = keyof typeof ACTION_MODE;
