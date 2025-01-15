import type { ISceneProp } from "../Scene/type";
import { ACTION_MODE, ACTION_TYPE } from "./actionConstant";

export type IRootProp = ISceneProp;

export type IActionMode = keyof typeof ACTION_MODE;

export type IActionType = keyof typeof ACTION_TYPE;
