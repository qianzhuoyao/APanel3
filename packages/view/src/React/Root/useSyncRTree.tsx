import { getNodeRTree, nodeMap } from "@repo/model/NodeModel";
import { INodeContent } from "../Scene/type";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { MIN_LEVEL } from "./level";

export const useSyncRTree = () => {
  const rTree = getNodeRTree();
  const _nodeMap = nodeMap();
  const root = useSelector(
    (state: {
      scene: {
        root: INodeContent;
      };
    }) => state.scene.root
  );

  useEffect(() => {
    if (_nodeMap.size === 0) return;
    rTree.clear();
    rTree.load(
      Array.from(_nodeMap.values())
        .filter((node) => node.type !== "SCENE")
        .map((node) => ({
          minX: node.x + (node.rootOffsetX || 0),
          minY: node.y + (node.rootOffsetY || 0),
          maxX: node.x + node.width + (node.rootOffsetX || 0),
          maxY: node.y + node.height + (node.rootOffsetY || 0),
          id: node.id,
          zIndex: node.zIndex || MIN_LEVEL,
          name: node.name,
        }))
    );
  }, [root]);
};
