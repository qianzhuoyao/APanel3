import { v4 } from "uuid";
import { INode } from "./type";
import { nodeMap } from "./nodeMap";

export const createNode = (params: {
  parent: INode | null;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}): { node: INode } => {
  const { parent, type, name, x, y, width, height } = params;
  const newNode: INode = {
    id: v4(), // 生成唯一 ID
    type,
    name,
    x,
    y,
    width,
    height,
    depth: parent ? parent.depth + 1 : 0, // 根据父节点深度设置自身深度
    children: [],
  };
  if (parent) {
    newNode.parent = parent;
    parent.children?.push(newNode);
  }
  nodeMap().set(newNode.id, newNode);

  return { node: newNode };
};
