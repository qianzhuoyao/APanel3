import { useDispatch } from "react-redux";
import { translateRoot } from "../Scene/translate";
import { setRoot } from "../Store/sceneStore";
import { traverseTree } from "@repo/model/NodeModel";
import { reTranslateRoot } from "../Scene/reTranslateRoot";
import { useSelector } from "react-redux";
import { INodeContent } from "../Scene/type";
import { INode } from "@repo/model/NodeModel/type";
import { DependencyList, useCallback } from "react";

/**
 * 更新 root
 * @returns
 */
export const useUpdateRoot = (deps?: DependencyList) => {
  const dispatch = useDispatch();
  const root = useSelector(
    (state: {
      scene: {
        root: INodeContent;
      };
    }) => state.scene.root
  );

  return useCallback(
    (iter: (node: INode) => void) => {
      reTranslateRoot(root, (newRoot) => {
        traverseTree(newRoot, iter);
        console.log(newRoot, root, "oslee");
        dispatch(setRoot(translateRoot(newRoot)));
      });
    },
    [root, ...(deps || [])]
  );
};
