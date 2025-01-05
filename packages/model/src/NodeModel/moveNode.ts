import { INode } from "./type";
// 移动节点
export const moveNode = (node: INode, newParent: INode | undefined) => {
  if (node.parent) {
    // 从原父节点移除
    node.parent.children = node.parent.children?.filter(
      (child) => child.id !== node.id
    );
  }

  node.parent = newParent;
  if (newParent) {
    newParent.children?.push(node);
  }

  updateNodeDepth(node); // 更新节点及其子节点的深度
};

// 更新节点及其子节点的深度
const updateNodeDepth = (node: INode) => {
  const newDepth = node.parent ? node.parent.depth + 1 : 0;
  if (node.depth !== newDepth) {
    node.depth = newDepth;
    if (node.children) {
      for (const child of node.children) {
        updateNodeDepth(child); // 递归更新子节点深度
      }
    }
  }
};
