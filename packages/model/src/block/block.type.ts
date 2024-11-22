import { createPermission } from "./../../../lib/src/permission/permission";
import { Permission } from "@repo/lib";
import { IHandlerResult } from "../handler";

export interface IBlockResult {
  groupId: string;
  name: string;
  copyBy?: string;
  blockPermission: ReturnType<typeof Permission.createPermission>;
  handler: IHandlerResult | null;
}

export interface IBlockParams {
  groupId: string;
  blockConfig: IBlockConfigResult;
  name: string;
  copyBy?: string;
  handler: IHandlerResult | null;
}

export type IBlock = (params: IBlockParams) => IBlockResult;

export interface IGraphNode {
  parentGroupId: string | null;
  childrenGroupId: Immutable.Set<string>;
}

export interface IModel {
  block: IBlockResult;
}

export interface IBlockConfigParams {
  type: string;
  pack: any;
}
export interface IBlockConfigResult {
  type: string;
  pack: any;
}

export type IBlockConfig = (params?: IBlockConfigParams) => IBlockConfigResult;
