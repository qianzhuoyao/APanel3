import { INode } from "@repo/model/NodeModel/type";
import { INodeContent } from "./type";
import { nodeMap } from "@repo/model/NodeModel";
/**
 * 将根节点转换为内容 去掉引用嵌套
 * @param root
 * @returns
 */
export const translateRoot = (root: INode): Partial<INodeContent> => {
  return JSON.parse(
    JSON.stringify(root, (key, value) => {
      if (key === "parent") {
        return value?.id;
      }
      return value;
    })
  );
};

const traverse = (
  node: INodeContent,
  callback: (node: INodeContent) => void
) => {
  callback(node);
  if (node.children) {
    for (const child of node.children) {
      traverse(child, callback); // 深度优先搜索
    }
  }
};

/**
 * 重新计算节点位置
 * @param node
 */
export const reTranslate = (node: INodeContent): INode => {
  const newNode = JSON.parse(JSON.stringify(node));
  traverse(newNode, (newNode) => {
    if (typeof newNode.parent === "string") {
      newNode.parent = nodeMap().get(newNode.parent);
    }
    if (!newNode.children) {
      newNode.children = [];
    }
    const children =
      newNode.children
        ?.map((child) => nodeMap().get(child.id))
        .filter((item) => !!item) || [];

    newNode.children = children;
  });
  return newNode;
};
