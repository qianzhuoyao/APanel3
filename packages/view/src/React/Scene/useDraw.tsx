import { Application, FederatedPointerEvent, Graphics } from "pixi.js";
import { IActionMode } from "../Root/type";
import { useEffect, useRef } from "react";
import { ACTION_MODE } from "../Root/actionConstant";

/**
 * 基于事件的绘制，不涉及编辑
 * @param param0
 */
export const useDraw = ({
  app,
  actionMode,
}: {
  app: Application | null;
  actionMode: IActionMode;
}) => {
  const graphicRef = useRef<{
    graphic: Graphics | null;
    isDrawing: boolean;
    startPoint: { x: number; y: number };
  }>({
    graphic: null,
    isDrawing: false,
    startPoint: { x: 0, y: 0 },
  });

  const handlePointerDown = (event: FederatedPointerEvent) => {
    console.log(actionMode, "cscascascascascascas");
    if (actionMode === ACTION_MODE.RECT) {
      console.log(event, "cscscscs");
      graphicRef.current.graphic = new Graphics();

      app?.stage.addChild(graphicRef.current.graphic);
      graphicRef.current.isDrawing = true;
      graphicRef.current.startPoint = { x: event.pageX, y: event.pageY };
    }
  };

  const handlePointerMove = (event: FederatedPointerEvent) => {
    if (graphicRef.current.isDrawing) {
      const width = Math.abs(event.pageX - graphicRef.current.startPoint.x);
      const height = Math.abs(event.pageY - graphicRef.current.startPoint.y);
      const x = Math.min(graphicRef.current.startPoint.x, event.pageX);
      const y = Math.min(graphicRef.current.startPoint.y, event.pageY);
      graphicRef.current.graphic?.clear();
      graphicRef.current.graphic?.roundRect(x, y, width, height, 2);
      graphicRef.current.graphic?.fill("#ffffff", 0.25);
      graphicRef.current.graphic?.stroke({ width: 2, color: "#e1e1e1" });
    }
  };

  const handlePointerUp = () => {
    if (graphicRef.current.isDrawing) {
      graphicRef.current.isDrawing = false;
      if (graphicRef.current.graphic) {
        app?.stage.removeChild(graphicRef.current.graphic);
        graphicRef.current.graphic = null;
      }
    }
  };

  useEffect(() => {
    if (app) {
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
