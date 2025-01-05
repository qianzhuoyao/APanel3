import { INode } from "./type";

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
