import { createNode } from "@repo/model/NodeModel";
import { useEffect, useRef } from "react";
import { INode } from "@repo/model/NodeModel/type";
export const useRoot = () => {
  const rootRef = useRef<{ root: INode | null }>({ root: null });
  useEffect(() => {
    const { node } = createNode({
      parent: null,
      type: "STAGE",
      name: "root",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
    rootRef.current.root = node;
  }, []);
  return rootRef.current.root;
};
