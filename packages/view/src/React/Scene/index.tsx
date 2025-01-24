import { IStageProp } from "./type";
import { createNode } from "@repo/model/NodeModel";
import { useEffect, useRef } from "react";
import { LEVEL } from "../Root/level";
import { translateRoot } from "./translate";
import { setRoot, setSelectionNodeIdList } from "../Store/sceneStore";
import { useDispatch, useSelector } from "react-redux";
/**
 * 场景
 * @param param0
 * @returns
 */

import { useInit } from "./useInit";
import { Spinner } from "@nextui-org/react";
import { useDraw } from "./useDraw";
import { IActionMode } from "../Root/type";
import { useRoot } from "./useRoot";
import { ContextMenu } from "./contextMenu";
import { useCreate } from "./useCreate";
import { ACTION_MODE } from "../Root/actionConstant";
import { FederatedPointerEvent, Rectangle } from "pixi.js";
import { INode } from "@repo/model/NodeModel/type";

export const Scene = () => {
  const globalVariablesRef = useRef<{
    actionMode: IActionMode;
  }>({
    actionMode: ACTION_MODE.MOVE,
  });

  const dispatch = useDispatch();
  /**
   * 获取actionMode
   */
  const actionMode = useSelector(
    (state: { scene: { actionMode: IActionMode } }) => state.scene.actionMode
  );

  const root = useRoot();

  /**
   * 初始化场景
   */
  const { setContainer, loading, app } = useInit();

  console.log(actionMode, `actionMode2`);

  useEffect(() => {
    globalVariablesRef.current = {
      actionMode,
    };
  }, [actionMode]);

  /**
   * 创建
   */
  const { notifySubscriber } = useCreate<{
    actionMode: IActionMode;
  }>({ app, root, deps: { actionMode } });

  const { drawGraphic, resetSelected } = useDraw({ app });

  const selectionNodeIdList = useSelector(
    (state: { scene: { selectionNodeIdList: string[] } }) =>
      state.scene.selectionNodeIdList
  );

  const setSelected = (node: INode | void) => {
    console.log(node, `setSelected`);
    if (node) {
      dispatch(setSelectionNodeIdList([node.id]));
    } else {
      dispatch(setSelectionNodeIdList([]));
    }
  };
  console.log(selectionNodeIdList,'selectionNodeIdList')

  notifySubscriber({
    onStagePointerUp: (event) => {
      if (globalVariablesRef.current.actionMode === ACTION_MODE.MOVE) {
        if (event.target === app?.stage) {
          setSelected();
          resetSelected();
        }
      }
    },
    createdCallback: (node) => {
      if (globalVariablesRef.current.actionMode === ACTION_MODE.RECT) {
        const { g, setGraphicSelected } = drawGraphic({
          width: node.width,
          height: node.height,
          x: node.x,
          y: node.y,
        });
        node.componentId = g.uid.toString();
        g?.on("pointerup", () => {
          //闭包
          if (globalVariablesRef.current.actionMode === ACTION_MODE.MOVE) {
            setGraphicSelected();
            setSelected(node);
          }
        });
      }
    },
  });

  return (
    <div ref={setContainer} className="w-full h-full overflow-hidden">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : null}
      <ContextMenu options={[{ item: () => <div>123</div> }]}></ContextMenu>
    </div>
  );
};
