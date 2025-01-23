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
