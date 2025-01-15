import { getNodeRTree } from "@repo/model/NodeModel";

export const inSomeRTreeNode = (pointer: { x: number; y: number }) => {
  const possibleResults = getNodeRTree().search({
    minX: pointer.x,
    minY: pointer.y,
    maxX: pointer.x,
    maxY: pointer.y,
  });
  return possibleResults.filter((rect) => {
    return (
      pointer.x >= rect.minX &&
      pointer.x <= rect.maxX &&
      pointer.y >= rect.minY &&
      pointer.y <= rect.maxY
    );
  });
};
