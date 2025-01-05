import { traverseTree } from "./traverseTree";
import { INode } from "./type";

// 根据深度排序节点
export const getNodesByDepth = (root: INode): INode[] => {
  const nodes: INode[] = [];
  traverseTree(root, (node) => nodes.push(node));
  nodes.sort((a, b) => a.depth - b.depth); // 按照深度升序排序
  return nodes;
};
