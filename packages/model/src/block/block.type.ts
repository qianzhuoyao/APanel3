import { createPermission } from "./../../../lib/src/permission/permission";
import { Permission } from "@repo/lib";
import { IHandlerResult } from "../handler";

export interface IBlockResult {
  groupId: string;
  name: string;
  copyBy?: string;
  blockPermission: ReturnType<typeof Permission.createPermission>;
  handler: IHandlerResult | null;
  interval?: number;
  eventPriority?: number;
}

export interface IBlockParams {
  groupId: string;
  name: string;
  copyBy?: string;
  handler: IHandlerResult | null;
  interval?: number;
  eventPriority?: number;
}

export type IBlock = (params: IBlockParams) => IBlockResult;

export interface IGraphNode {
  parentGroupId: string | null;
  childrenGroupId: Immutable.Set<string>;
}

export interface ITaskStruct {
  condition: string;
  fnName: string;
  runTimes: number;
  repeatTime: number;
}

export type IBlockSubscription = Pick<ITaskStruct, "condition" | "fnName">;

export interface IEventTask {
  eventName: string;
  isCatch: boolean;
  conditionCall: string;
  send: Pick<ITaskStruct, "runTimes" | "repeatTime" | "fnName">[][];
  call: Pick<ITaskStruct, "runTimes" | "fnName">[][];
}

export type IBlockSubscriptionBuilder = () => string;

export type IBlockEventTask = () => string;

export interface IModel {
  block: IBlockResult;
  eventTask: string;
  config: string;
  subscription: string;
}

export interface IBlockConfigParams {
  type: string;
  pack: any;
}
export interface IBlockConfigResult {
  type: string;
  pack: any;
}

export type IBlockConfig = (params?: IBlockConfigParams) => string;
