import { Permission } from "@repo/lib";
import { IHandlerResult } from "../handler";
import { IBlockTrigger } from "../trigger/trigger.type";
import * as Immutable from "immutable";

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

export type IBlockSubscriptionBuilder = () => {
  getSubscriptionMap: () => Immutable.Map<string, IBlockTrigger>;
  setSubscriptionMap: (
    changeFunc: (
      map: Immutable.Map<string, IBlockTrigger>
    ) => Immutable.Map<string, IBlockTrigger>
  ) => void;
};

export type IBlockEventTask = () => string;

export interface IModel {
  block: IBlockResult;
  eventTask: string;
  config: string;
  subscription: ReturnType<IBlockSubscriptionBuilder>;
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
