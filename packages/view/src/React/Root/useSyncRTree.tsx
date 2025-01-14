import { getNodeRTree, nodeMap } from "@repo/model/NodeModel";
import { INodeContent } from "../Scene/type";
import { useSelector } from "react-redux";
import { useEffect } from "react";

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
          minX: node.x,
          minY: node.y,
          maxX: node.x + node.width,
          maxY: node.y + node.height,
          id: node.id,
          name: node.name,
        }))
    );
  }, [root]);
};
