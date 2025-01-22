import { INodeContent, IStageProp } from "./type";
import { createNode, nodeMap } from "@repo/model/NodeModel";
import * as PIXI from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { LEVEL } from "../Root/level";
import { translateRoot } from "./translate";
import {
  setActionMode,
  setAllNodes,
  setRoot,
  setSelectionNodeIdList,
} from "../Store/sceneStore";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_MODE } from "../Root/actionConstant";
/**
 * 场景
 * @param param0
 * @returns
 */

import { useInit } from "./useInit";
import { Spinner } from "@nextui-org/react";
import { useDraw } from "./useDraw";
import { IActionMode } from "../Root/type";

export const Scene = ({ width, height }: IStageProp) => {
  const actionMode = useSelector(
    (state: { scene: { actionMode: IActionMode } }) => state.scene.actionMode
  );

  const { setContainer, loading, app } = useInit();

  useDraw({ app, actionMode });

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [currentRect, setCurrentRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const dispatch = useDispatch();

  const root = useSelector(
    (state: {
      scene: {
        root: INodeContent;
      };
    }) => state.scene.root
  );

  const selectionNodeIdList = useSelector(
    (state: { scene: { selectionNodeIdList: string[] } }) =>
      state.scene.selectionNodeIdList
  );
  /**
   * 初始化场景
   */
  useEffect(() => {
    const Root = createNode({
      parent: null,
      type: "SCENE",
      name: "Root",
      x: 0,
      y: 0,
      width: width,
      height: height,
      rootOffsetX: 0,
      zIndex: LEVEL.scene,
      rootOffsetY: 0,
    });
    const RootContent = translateRoot(Root.node);
    dispatch(setRoot(RootContent));
  }, [width, height]);

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (actionMode === ACTION_MODE.RECT) {
      console.log(event, "cscscscs");
      setIsDrawing(true);
      setStartPoint({ x: event.pageX, y: event.pageY });
      setCurrentRect({
        x: event.pageX,
        y: event.pageY,
        width: 0,
        height: 0,
      });
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const width = Math.abs(event.pageX - startPoint.x);
      const height = Math.abs(event.pageY - startPoint.y);
      const x = Math.min(startPoint.x, event.pageX);
      const y = Math.min(startPoint.y, event.pageY);
      setCurrentRect({
        x: x,
        y: y,
        width: width,
        height: height,
      });
    }
  };

  const allNodes = useSelector(
    (state: {
      scene: {
        allNodes: INodeContent[];
      };
    }) => state.scene.allNodes
  );

  const handlePointerUp = () => {
    setIsDrawing(false);
    const rootNode = nodeMap().get(root?.id ?? "");
    const node = createNode({
      parent: rootNode ?? null,
      type: "RECT",
      name: "RECT_NODE",
      x: currentRect.x,
      y: currentRect.y,
      width: currentRect.width,
      height: currentRect.height,
    });
    const parseNode: INodeContent = JSON.parse(
      JSON.stringify(node.node, (key, value) => {
        if (key === "parent") {
          return value?.id;
        }
        return value;
      })
    );

    dispatch(setAllNodes([...allNodes, parseNode]));

    if (actionMode !== ACTION_MODE.HAND && actionMode !== ACTION_MODE.MOUSE) {
      dispatch(setActionMode(ACTION_MODE.MOUSE));
    }
  };

  const onPointerGraphicsUp = useCallback(
    (e: PIXI.FederatedPointerEvent, content: INodeContent) => {
      console.log(content, "contdwdwent");
      dispatch(setSelectionNodeIdList([content.id]));
    },
    [dispatch]
  );

  return (
    <div ref={setContainer} className="w-full h-full overflow-hidden">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : null}
    </div>
  );
};
