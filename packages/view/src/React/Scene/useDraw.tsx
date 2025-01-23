import {
  Application,
  FederatedPointerEvent,
  Graphics,
  Rectangle,
} from "pixi.js";
import { IActionMode } from "../Root/type";
import { useEffect, useRef } from "react";
import { ACTION_MODE } from "../Root/actionConstant";
import { INode } from "@repo/model/NodeModel/type";
import { createNode } from "@repo/model/NodeModel";
import { v4 } from "uuid";

/**
 * 基于事件的绘制，不涉及编辑
 * @param param0
 */
export const useDraw = ({
  app,
  actionMode,
  root,
}: {
  app: Application | null;
  actionMode: IActionMode;
  root: INode | null;
}) => {
  const nodeInfoRef = useRef<{
    list: Record<
      string,
      { width: number; height: number; x: number; y: number }
    >;
  }>({ list: {} });
  const graphicRef = useRef<{
    graphic: Graphics | null;
    isDrawing: boolean;
    startPoint: { x: number; y: number };
    rect: { width: number; height: number; x: number; y: number };
  }>({
    graphic: null,
    isDrawing: false,
    startPoint: { x: 0, y: 0 },
    rect: { width: 0, height: 0, x: 0, y: 0 },
  });

  /**
   * 绘制矩形
   * @param event
   */
  const handlePointerDown = (event: FederatedPointerEvent) => {
    console.log(actionMode, app?.stage, event, "cscascascascascascas1");

    app?.stage.children.forEach((g) => {
      if (g instanceof Graphics) {
        console.log(g, "ce4e4");
        const currentNode = nodeInfoRef.current.list[g.uid.toString()];
        if (currentNode) {
          g.clear();
          g.roundRect(0, 0, currentNode.width, currentNode.height, 5);
          g.fill("#ffffff", 0.25);
          g.stroke({ width: 2, color: "#e1e1e1" });
        }
      }
    });

    if (actionMode === ACTION_MODE.RECT) {
      if (event.button === 0) {
        console.log(event, "cscscscs");
        graphicRef.current.graphic = new Graphics();
        app?.stage.addChild(graphicRef.current.graphic);
        graphicRef.current.isDrawing = true;
        graphicRef.current.startPoint = { x: event.pageX, y: event.pageY };
      }
    }
  };

  /**
   * 是否隐藏绘制图形
   * @param width
   * @param height
   * @returns
   */
  const isHideGraphic = (width: number, height: number) => {
    return width < 10 && height < 10;
  };

  /**
   * 绘制矩形
   * @param graphic
   * @param width
   * @param height
   * @param x
   * @param y
   */
  const drawGraphic = (
    graphic: Graphics,
    width: number,
    height: number,
    x: number,
    y: number,
    isFill: boolean
  ) => {
    const actMinWidth = width < 10 ? 10 : width;
    const actMinHeight = height < 10 ? 10 : height;
    if (isHideGraphic(width, height)) {
      graphic.visible = false;
    } else {
      graphic.visible = true;
    }
    graphic.x = x;
    graphic.y = y;
    graphic.width = actMinWidth;
    graphic.height = actMinHeight;
    graphic.clear();
    graphic.roundRect(0, 0, actMinWidth, actMinHeight, 5);
    isFill && graphic.fill("#ffffff", 0.25);
    graphic.stroke({ width: 2, color: "#e1e1e1" });
  };

  const handlePointerMove = (event: FederatedPointerEvent) => {
    if (graphicRef.current.isDrawing) {
      const width = Math.abs(event.pageX - graphicRef.current.startPoint.x);
      const height = Math.abs(event.pageY - graphicRef.current.startPoint.y);
      const x = Math.min(graphicRef.current.startPoint.x, event.pageX);
      const y = Math.min(graphicRef.current.startPoint.y, event.pageY);
      drawGraphic(graphicRef.current.graphic!, width, height, x, y, false);
      graphicRef.current.rect = { width, height, x, y };
    }
  };

  const selectNode = () => {};

  /**
   * 添加绘制图形
   */
  const appendGraphic = () => {
    const { x, y, width, height } = graphicRef.current.rect;
    const g = new Graphics();
    g.interactive = true;
    g.hitArea = new Rectangle(0, 0, width, height);
    g.on("pointerdown", (event) => {
      console.log(event, "cscscsqqqcs");
    });
    g.on("pointerup", (event) => {
      console.log(event, "cscascascascascascas2");
      g.clear();
      g.x = x;
      g.y = y;
      g.width = width;
      g.height = height;
      g.roundRect(0, 0, width, height, 5);
      g.fill("#ffffff", 0.25);
      g.stroke({ width: 2, color: "green" });
    });
    drawGraphic(g, width, height, x, y, true);
    app?.stage.addChild(g);
    return g;
  };

  const handlePointerUp = () => {
    if (graphicRef.current.isDrawing) {
      graphicRef.current.isDrawing = false;
      if (graphicRef.current.graphic) {
        const { width, height, x, y } = graphicRef.current.rect;

        if (!isHideGraphic(width, height)) {
          const g = appendGraphic();
          nodeInfoRef.current.list[g.uid.toString()] = { width, height, x, y };
          createNode({
            componentId: g.uid.toString(),
            parent: root,
            type: "RECT",
            name: "rect",
            x: x,
            y: y,
            width: width,
            height: height,
          });

          console.log(g.uid, root, "csacascaaaaaasc");
        }

        app?.stage.removeChild(graphicRef.current.graphic);
        graphicRef.current.rect = { width: 0, height: 0, x: 0, y: 0 };
        graphicRef.current.graphic = null;
      }
    }
  };

  useEffect(() => {
    if (app) {
      console.log("ssc");
      app.stage.on("pointerdown", handlePointerDown);
      app.stage.on("pointermove", handlePointerMove);
      app.stage.on("pointerup", handlePointerUp);

      return () => {
        app.stage.off("pointerdown", handlePointerDown);
        app.stage.off("pointermove", handlePointerMove);
        app.stage.off("pointerup", handlePointerUp);
      };
    }
  }, [app, actionMode]);
};
