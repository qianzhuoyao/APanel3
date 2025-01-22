import { INode } from "@repo/model/NodeModel/type";
import { CSSProperties } from "react";

export interface ISceneProp {
  style?: CSSProperties;
  className?: string;
}

export interface IStageProp {
  width: number;
  height: number;
}

export type INodeContent = Omit<INode, "parent" | "children"> & {
  parent?: string | INode;
  children?: INodeContent[] | INode[];
};
