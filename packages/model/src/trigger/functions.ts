import { createSingle } from "@repo/lib";
import { IITriggerFunctionMap } from "./trigger.type";

//注册函数
const _functionMap = createSingle(() => {
  const functionMap: IITriggerFunctionMap = {};
  return { functionMap };
});

export const hasFunction = (key: string) => !!_functionMap().functionMap[key];

export const getFunctionMap = () => _functionMap().functionMap;
export const queryFunction = (key: string) => _functionMap().functionMap[key];
