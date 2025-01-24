import { useEffect, useRef } from "react";
import { setSelectionNodeIdList } from "../Store/sceneStore";
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
import { INode } from "@repo/model/NodeModel/type";
import { getApp } from "./app";

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
  /**
   * 获取root
   */
  const root = useRoot();

  /**
   * 初始化场景
   */
  const { setContainer, loading, load } = useInit();

  /**
   * 设置actionMode
   */
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
  }>({ app: getApp().app, root, deps: { actionMode } });

  /**
   * 绘制
   */
  const { drawGraphic, resetSelected, initHandler } = useDraw({
    app: getApp().app,
  });

  /**
   * 初始化绘制,绘制绘制工具handler
   */
  load(() => {
    initHandler();
  });

  /**
   * 获取selectionNodeIdList
   */
  const selectionNodeIdList = useSelector(
    (state: { scene: { selectionNodeIdList: string[] } }) =>
      state.scene.selectionNodeIdList
  );

  /**
   * 设置selectionNodeIdList
   */
  const setSelected = (node: INode | void) => {
    console.log(node, `setSelected`);
    if (node) {
      dispatch(setSelectionNodeIdList([node.id]));
    } else {
      dispatch(setSelectionNodeIdList([]));
    }
  };
  /**
   * 通知订阅者
   */
  notifySubscriber({
    /**
     * 舞台指针抬起
     */
    onStagePointerUp: (event) => {
      if (globalVariablesRef.current.actionMode === ACTION_MODE.MOVE) {
        if (event.target === getApp().app?.stage) {
          setSelected();
          resetSelected();
        }
      }
    },
    /**
     * 创建回调
     */
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
            console.log(getApp().app, getApp(), "cevv");
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
