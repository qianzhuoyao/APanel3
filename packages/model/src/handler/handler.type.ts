import { permission, Rxjs } from "@repo/lib";
import { POINTER_POSITION_CODE } from "./pointer";

export interface IHandlerParams {
  node: HTMLElement;
  nodePermission: number;
  selected: boolean;
  handlerContainer: HTMLDivElement;
  groupId: string;
  _pointer?: Record<IType_of_POINTER_POSITION_CODE, HTMLDivElement>;
  eventSubscriptionMap: Record<string, Rxjs.Subscription>;
}

export interface IHandlerResizeEventStage {
  resizeStart: (e: MouseEvent, anchor: IType_of_POINTER_POSITION_CODE) => void;
  resizeRunning: (
    e: MouseEvent,
    anchor: IType_of_POINTER_POSITION_CODE
  ) => void;
  resizeFinish: (e: MouseEvent, anchor: IType_of_POINTER_POSITION_CODE) => void;
}

export interface IHandlerDragEventStage {
  dragStart: (e: MouseEvent) => void;
  dragRunning: (e: MouseEvent) => void;
  dragFinish: (e: MouseEvent) => void;
}

export interface IHandlerResult {
  node: HTMLElement;
  pointer: Record<IType_of_POINTER_POSITION_CODE, HTMLDivElement>;
  handlerContainer: HTMLDivElement;
  remove: () => void;
  setSelected: (selected: boolean) => IHandlerResult;
  isSelected: () => boolean;
  addEventListener: (
    eventName: string,
    eventCallback: (evt: Event) => void
  ) => IHandlerResult;
  getNodePermission: () => number;
  setNodePermission: (nodePermission: number) => IHandlerResult;
  addDragEventListener: (
    eventName: keyof IHandlerDragEventStage,
    cb: (e: MouseEvent) => void
  ) => IHandlerResult;
  addResizeEventListener: (
    eventName: keyof IHandlerResizeEventStage,
    cb: (e: MouseEvent, anchor: IType_of_POINTER_POSITION_CODE) => void
  ) => IHandlerResult;
}

export type IHandler = (
  params: IHandlerParams &
    Partial<IHandlerDragEventStage> &
    Partial<IHandlerResizeEventStage>
) => IHandlerResult;

export type IType_of_POINTER_POSITION_CODE =
  (typeof POINTER_POSITION_CODE)[number];
