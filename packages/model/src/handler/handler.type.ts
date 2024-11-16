import { permission, Rxjs } from "@repo/lib";
import { POINTER_POSITION_CODE } from "./pointer";

export interface IHandlerParams {
  node: HTMLElement;
  nodePermission: number;
  selected: boolean;
  handlerContainer: HTMLDivElement;
  groupId: string;
  eventSubscriptionMap: Record<string, Rxjs.Subscription>;
}

export interface IHandlerResult {
  node: HTMLElement;
  pointer: Record<string, HTMLDivElement>;
  handlerContainer: HTMLDivElement;
  remove: () => void;
  setSelected: (selected: boolean) => IHandlerResult;
  isSelected: () => boolean;
  addEventListener: (
    eventName: string,
    eventCallback: (evt: Event) => void
  ) => void;
  getNodePermission: () => number;
  setNodePermission: (nodePermission: number) => IHandlerResult;
}

export type IHandler = (params: IHandlerParams) => IHandlerResult;

export type IType_of_POINTER_POSITION_CODE =
  (typeof POINTER_POSITION_CODE)[number];
