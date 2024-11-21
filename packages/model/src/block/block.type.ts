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

export type IBlock = (params: {
  groupId: string;
  name: string;
  copyBy?: string;
  handler: IHandlerResult | null;
}) => IBlockResult;

export interface IGraphNode {
  parentGroupId: string | null;
  childrenGroupId: Immutable.Set<string>;
}
