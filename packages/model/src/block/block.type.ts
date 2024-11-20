import { createPermission } from "./../../../lib/src/permission/permission";
import { Permission } from "@repo/lib";
import { IHandlerResult } from "../handler";

export interface IBlockResult {
  groupId: string;
  name: string;
  blockPermission: ReturnType<typeof Permission.createPermission>;
  handler: IHandlerResult | null;
}

export type IBlock = (params: {
  groupId: string;
  name: string;
  handler: IHandlerResult | null;
}) => IBlockResult;

export interface IGraphNode {
  parentGroupId: string;
  childrenGroupId: string[];
}
