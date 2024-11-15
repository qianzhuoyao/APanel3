import { permission } from "@repo/lib";
import { POINTER_POSITION_CODE } from "./pointer";

export interface IHandlerParams {
  node: HTMLElement;
  initPermission?: number;
}

export interface IHandlerResult {
  node: HTMLElement;
  nodePermission: ReturnType<typeof permission.createPermission>;
  pointer: Record<string, HTMLDivElement>;
  handlerContainer: HTMLDivElement;
  remove: () => void;
  setSelected: (selected: boolean) => void;
  isSelected: () => boolean;
  addEventListener: (
    eventName: string,
    eventCallback: (evt: Event) => void
  ) => void;
}

export type IHandler = (params: IHandlerParams) => IHandlerResult;

export type IType_of_POINTER_POSITION_CODE =
  (typeof POINTER_POSITION_CODE)[number];
