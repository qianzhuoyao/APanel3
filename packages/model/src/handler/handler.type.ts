import { permission } from "@repo/lib";

export interface IHandlerParams {
  node: HTMLElement;
  initPermission?: number;
}

export interface IHandlerResult {
  node: HTMLElement;
  nodePermission: ReturnType<typeof permission.createPermission>;
  pointer: Record<string, HTMLDivElement>;
}

export type IHandler = (params: IHandlerParams) => IHandlerResult;
