import { Permission, Rxjs } from "@repo/lib";
import { POINTER_POSITION_CODE } from "./pointer";

export interface IHandlerParams {
  node: HTMLElement;
  nodePermission: number;
  selected: boolean;
  handlerContainer: HTMLDivElement;
  groupId: string;
  _pointer?: Record<IType_of_POINTER_POSITION_CODE, HTMLDivElement>;
  eventSubscriptionMap: Record<string, Rxjs.Subscription | void>;
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

export interface IHandlerBothDragEventStage {
  bothDragStart: (e: MouseEvent) => void;
  bothDragRunning: (e: MouseEvent) => void;
  bothDragFinish: (e: MouseEvent) => void;
}

export interface IHandlerResult {
  node: HTMLElement;
  handlerId: string;
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
  setNodePermission: (
    permission: (nodePermission: number) => number
  ) => IHandlerResult;
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

export interface IDragAcross {
  initDomLeft: number;
  initDOmTop: number;
  initMouseLeft: number;
  initMouseTop: number;
}

export interface IAcross {
  masterNode: NodeListOf<Element>;
  masterNodeOffsetLeft: string | null;
  masterNodeOffsetTop: string | null;
  initMasterNodeWidth: number;
  initMasterNodeHeight: number;
  initMouseLeft: number;
  initMouseTop: number;
}
export interface IUpdateParams {
  across: IAcross;
  masterNodeOffsetLeft: number;
  offsetLeft: number;
  masterNodeOffsetTop: number;
  offsetTop: number;
  position: IType_of_POINTER_POSITION_CODE;
}
