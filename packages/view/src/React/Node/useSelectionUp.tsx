import { setActionType, setSelectionEnd } from "../Store/sceneStore";

import { setSelectionStart } from "../Store/sceneStore";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sceneMouseUp } from "../Scene/sceneEvent";
import { setActionMode, setRoot } from "../Store/sceneStore";
import { createNode } from "@repo/model/NodeModel";
import { nodeMap } from "@repo/model/NodeModel";
import { ACTION_MODE, ACTION_TYPE } from "../Root/actionConstant";
import { IActionMode } from "../Root/type";
import { INode } from "@repo/model/NodeModel/type";
import { translateRoot } from "../Scene/translate";
import { INodeContent } from "../Scene/type";

export const useSelectionUp = () => {
  const dispatch = useDispatch();

  const selectionStart = useSelector(
    (state: {
      scene: {
        selectionStart: { x: number; y: number };
      };
    }) => state.scene.selectionStart
  );
  const selectionEnd = useSelector(
    (state: {
      scene: {
        selectionEnd: { x: number; y: number };
      };
    }) => state.scene.selectionEnd
  );

  const root = useSelector(
    (state: {
      scene: {
        root: INode;
      };
    }) => state.scene.root
  );

  const actionMode = useSelector(
    (state: {
      scene: {
        actionMode: IActionMode;
      };
    }) => state.scene.actionMode
  );

  /**
   * 选框左上角坐标
   */
  const selectionLeft = useMemo(() => {
    if (!selectionStart || !selectionEnd) return 0;
    return Math.min(selectionStart.x, selectionEnd.x);
  }, [selectionStart, selectionEnd]);

  const selectionTop = useMemo(() => {
    if (!selectionStart || !selectionEnd) return 0;
    return Math.min(selectionStart.y, selectionEnd.y);
  }, [selectionStart, selectionEnd]);

  const currentPickNode = useSelector(
    (state: {
      scene: {
        currentPickNode: INodeContent | null;
      };
    }) => state.scene.currentPickNode
  );

  /**
   * 选框宽度
   */
  const selectionWidth = useMemo(() => {
    if (!selectionStart || !selectionEnd) return 0;
    return Math.abs(selectionEnd.x - selectionStart.x);
  }, [selectionStart, selectionEnd]);
  /**
   * 选框高度
   */
  const selectionHeight = useMemo(() => {
    if (!selectionStart || !selectionEnd) return 0;
    return Math.abs(selectionEnd.y - selectionStart.y);
  }, [selectionStart, selectionEnd]);

  useEffect(() => {
    const mouseUpSubscription = sceneMouseUp().observable.subscribe((e) => {
      dispatch(setActionType(ACTION_TYPE.DEFAULT));
      const rootNode = nodeMap().get(root.id);
      if (e.target instanceof HTMLElement && currentPickNode) {
        const currentNode = nodeMap().get(currentPickNode.id);
        console.log(currentNode, "currentNode");

        //创建正方形节点
        if (actionMode === ACTION_MODE.RECT) {
          if (currentNode) {
            // 创建节点
            createNode({
              parent: currentNode,
              type: ACTION_MODE.RECT,
              name: "矩形节点",
              x: selectionLeft - (currentNode?.x || 0),
              strokeWidth: "1px",
              strokeType: "solid",
              strokeRadius: "4px",
              fill: "#ffffff",
              rootOffsetX: currentNode?.rootOffsetX || 0,
              rootOffsetY: currentNode?.rootOffsetY || 0,
              stroke: "#1b1b1f",
              y: selectionTop - (currentNode?.y || 0),
              width: selectionWidth,
              height: selectionHeight,
            });

            dispatch(setActionMode(ACTION_MODE.MOUSE));
          }
        } else if (actionMode === ACTION_MODE.MOUSE) {
          //选中效果
        }

        // 更新根节点
        if (rootNode) {
          const newRoot = translateRoot(rootNode);
          console.log(newRoot, rootNode, "newRootsss");
          dispatch(setRoot(newRoot));
        }
      }

      dispatch(setSelectionStart(null));
      dispatch(setSelectionEnd(null));
    });

    return () => {
      mouseUpSubscription.unsubscribe();
    };
  }, [
    selectionLeft,
    selectionTop,
    currentPickNode,
    selectionWidth,
    selectionHeight,
    actionMode,
    root,
  ]);
};
