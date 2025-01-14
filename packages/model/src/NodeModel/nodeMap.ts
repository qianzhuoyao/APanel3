import { INode } from "./type";
import RBush from "rbush";

const createSingle = <C>(initializer: () => C): (() => C) => {
  let instance: C | null = null;
  return () => {
    if (instance === null) {
      instance = initializer();
    }
    return instance;
  };
};

export const nodeMap = createSingle(() => new Map<string, INode>());
export const getNodeRTree = createSingle(
  () =>
    new RBush<{
      minX: number;
      minY: number;
      maxX: number;
      maxY: number;
      name: string;
      id: string;
    }>()
);
