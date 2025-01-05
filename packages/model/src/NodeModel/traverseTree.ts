import { INode } from "./type";

// 遍历树
export const traverseTree = (node: INode, callback: (node: INode) => void) => {
  callback(node);
  if (node.children) {
    for (const child of node.children) {
      traverseTree(child, callback); // 深度优先搜索
    }
  }
};
