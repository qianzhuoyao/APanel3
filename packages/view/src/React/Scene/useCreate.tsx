import { createNode } from "@repo/model/NodeModel";
import { INode } from "@repo/model/NodeModel/type";
import { Application, FederatedPointerEvent, Graphics } from "pixi.js";
import { useEffect, useRef } from "react";

interface ISubscriber {
  onStagePointerUp?: (e: FederatedPointerEvent) => void;
  createdCallback: (
    node: INode,
    info: {
      x: number;
      y: number;
      width: number;
      height: number;
    }
  ) => void;
}

export const useCreate = <T extends Record<string, unknown>>({
  app,
  root,
  deps,
}: {
  app: Application | null;
  root: INode | null;
  deps: T;
}) => {
  /**
   * 变量
   */
  const variablesRef = useRef<{
    v: Partial<T>;
  }>({ v: {} });
  /**
   * 订阅者
   */
  const subscribersRef = useRef<Partial<ISubscriber>>({});
  /**
   * 图形
   */
  const graphicRef = useRef<{
    selection: Graphics | null;
    isDrawing: boolean;
    startPoint: { x: number; y: number };
  }>({
    selection: null,
    isDrawing: false,
    startPoint: { x: 0, y: 0 },
  });

  /**
   * 创建selection
   */
  const createSelection = () => {
    if (graphicRef.current.selection) {
      return graphicRef.current.selection;
    }

    graphicRef.current.selection = new Graphics();
    app?.stage.addChild(graphicRef.current.selection);
    return graphicRef.current.selection;
  };

  /**
   * 获取尺寸和位置
   * @param event
   * @returns
   */
  const getSizePosition = (event: FederatedPointerEvent) => {
    const width = Math.abs(event.pageX - graphicRef.current.startPoint.x);
    const height = Math.abs(event.pageY - graphicRef.current.startPoint.y);
    const x = Math.min(graphicRef.current.startPoint.x, event.pageX);
    const y = Math.min(graphicRef.current.startPoint.y, event.pageY);
    return {
      width,
      height,
      x,
      y,
    };
  };

  /**
   * 指针按下
   * @param event
   */
  const handlePointerDown = (event: FederatedPointerEvent) => {
    if (event.button === 0) {
      graphicRef.current.selection!.visible = false;
      graphicRef.current.isDrawing = true;
      graphicRef.current.startPoint = { x: event.pageX, y: event.pageY };
    }

    console.log("pointerdown");
  };

  /**
   * 指针移动
   * @param event
   */
  const handlePointerMove = (event: FederatedPointerEvent) => {
    if (graphicRef.current.isDrawing) {
      const { width, height, x, y } = getSizePosition(event);
      //ignore small rect
      if (width > 10 && height > 10) {
        graphicRef.current.selection!.visible = true;
      }

      console.log(graphicRef.current.selection, x, y, width, height, "ddddd");
      //draw
      graphicRef.current.selection!.clear();
      graphicRef.current.selection!.x = x;
      graphicRef.current.selection!.y = y;
      graphicRef.current.selection!.roundRect(0, 0, width, height, 0);
      graphicRef.current.selection!.fill("#ffffff", 0.25);
      graphicRef.current.selection!.stroke({ width: 2, color: "#e1e1e1" });
    }
  };
  /**
   * 指针抬起
   * @param event
   */
  const handlePointerUp = (event: FederatedPointerEvent) => {
    const { width, height, x, y } = getSizePosition(event);
    graphicRef.current.isDrawing = false;
    if (width > 10 && height > 10) {
      const { node } = createNode({
        parent: root,
        type: "rect",
        name: "rect",
        x,
        y,
        width,
        height,
      });
      console.log(variablesRef.current.v, "variablesRef.current.v");
      subscribersRef.current.createdCallback?.(node, {
        x,
        y,
        width,
        height,
      });
      graphicRef.current.selection!.visible = false;
      graphicRef.current.startPoint = { x: 0, y: 0 };
    }

    subscribersRef.current.onStagePointerUp?.(event);
  };

  /**
   * 初始化
   */
  useEffect(() => {
    if (app) {
      variablesRef.current.v = deps || {};
      createSelection();
      app.stage.on("pointerdown", handlePointerDown);
      app.stage.on("pointermove", handlePointerMove);
      app.stage.on("pointerup", handlePointerUp);

      return () => {
        app.stage?.off("pointerdown", handlePointerDown);
        app.stage?.off("pointermove", handlePointerMove);
        app.stage?.off("pointerup", handlePointerUp);
      };
    }
  }, [app, deps]);

  /**
   * 通知订阅者
   * @param subscriber
   */
  const notifySubscriber = (subscriber: ISubscriber) => {
    subscribersRef.current = subscriber;
  };

  return {
    notifySubscriber,
  };
};
