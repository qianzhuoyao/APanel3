import { INode } from "@repo/model/NodeModel/type";
import { reTranslate } from "./translate";
import { INodeContent } from "./type";

export const reTranslateRoot = (root: INodeContent, update: (node: INode) => void) => {
  update(reTranslate(root));
};
