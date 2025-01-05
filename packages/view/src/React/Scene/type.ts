import { INode } from "@repo/model/NodeModel/type";
import { CSSProperties } from "react";

export interface ISceneProp {
  style?: CSSProperties;
}
export type INodeContent = Omit<INode, "parent" | "children"> & {
  parent?: string;
  children?: INodeContent[];
};
