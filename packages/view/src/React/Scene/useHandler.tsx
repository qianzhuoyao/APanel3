import { useEffect } from "react";

import { Application, Graphics } from "pixi.js";
import { useRef } from "react";
import { getApp } from "./app";

export const useHandler = () => {
  const handlerStatusRef = useRef<{
    currentHandler: Graphics | null;
    isDragging: boolean;
  }>({
    currentHandler: null,
    isDragging: false,
  });
  const handlerRef = useRef<{
    leftTop: Graphics | null;
    leftCenter: Graphics | null;
    leftBottom: Graphics | null;
    topCenter: Graphics | null;
    bottomCenter: Graphics | null;
    rightTop: Graphics | null;
    rightCenter: Graphics | null;
    rightBottm: Graphics | null;
    rotate: Graphics | null;
    rotateAnchor: Graphics | null;
  }>({
    leftTop: null,
    leftCenter: null,
    leftBottom: null,
    topCenter: null,
    bottomCenter: null,
    rightTop: null,
    rightCenter: null,
    rightBottm: null,
    rotate: null,
    rotateAnchor: null,
  });
  /**
   * 初始化绘制工具handler
   */
  const initHandler = () => {
    const app = getApp().app;
    if (handlerRef.current.leftTop) {
      app?.stage.removeChild(handlerRef.current.leftTop);
      handlerRef.current.leftTop.destroy();
    }
    if (handlerRef.current.leftCenter) {
      app?.stage.removeChild(handlerRef.current.leftCenter);
      handlerRef.current.leftCenter.destroy();
    }
    if (handlerRef.current.leftBottom) {
      app?.stage.removeChild(handlerRef.current.leftBottom);
      handlerRef.current.leftBottom.destroy();
    }
    if (handlerRef.current.topCenter) {
      app?.stage.removeChild(handlerRef.current.topCenter);
      handlerRef.current.topCenter.destroy();
    }

    if (handlerRef.current.bottomCenter) {
      app?.stage.removeChild(handlerRef.current.bottomCenter);
      handlerRef.current.bottomCenter.destroy();
    }
    if (handlerRef.current.rightTop) {
      app?.stage.removeChild(handlerRef.current.rightTop);
      handlerRef.current.rightTop.destroy();
    }
    if (handlerRef.current.rightCenter) {
      app?.stage.removeChild(handlerRef.current.rightCenter);
      handlerRef.current.rightCenter.destroy();
    }
    if (handlerRef.current.rightBottm) {
      app?.stage.removeChild(handlerRef.current.rightBottm);
      handlerRef.current.rightBottm.destroy();
    }
    if (handlerRef.current.rotate) {
      app?.stage.removeChild(handlerRef.current.rotate);
      handlerRef.current.rotate.destroy();
    }
    if (handlerRef.current.rotateAnchor) {
      app?.stage.removeChild(handlerRef.current.rotateAnchor);
      handlerRef.current.rotateAnchor.destroy();
    }

    handlerRef.current.leftTop = new Graphics();
    handlerRef.current.leftCenter = new Graphics();
    handlerRef.current.leftBottom = new Graphics();
    handlerRef.current.topCenter = new Graphics();
    handlerRef.current.bottomCenter = new Graphics();
    handlerRef.current.rightTop = new Graphics();
    handlerRef.current.rightCenter = new Graphics();
    handlerRef.current.rightBottm = new Graphics();
    handlerRef.current.rotate = new Graphics();
    handlerRef.current.rotateAnchor = new Graphics();
    console.log(app, "33333313");
    app?.stage.addChild(handlerRef.current.leftTop);
    app?.stage.addChild(handlerRef.current.leftCenter);
    app?.stage.addChild(handlerRef.current.leftBottom);
    app?.stage.addChild(handlerRef.current.topCenter);
    app?.stage.addChild(handlerRef.current.bottomCenter);
    app?.stage.addChild(handlerRef.current.rightTop);
    app?.stage.addChild(handlerRef.current.rightCenter);
    app?.stage.addChild(handlerRef.current.rightBottm);
    app?.stage.addChild(handlerRef.current.rotate);
    app?.stage.addChild(handlerRef.current.rotateAnchor);
  };
  /**
   * 更新绘制工具handler
   * @param rect
   */
  const updateHandlers = (rect: Graphics) => {
    const cos = Math.cos(rect.rotation);
    const sin = Math.sin(rect.rotation);

    Object.values(handlerRef.current).forEach((handler) => {
      if (!handler) return;
      const offsetX = handler.x * cos - handler.y * sin;
      const offsetY = handler.x * sin + handler.y * cos;
      handler.x = rect.x + offsetX;
      handler.y = rect.y + offsetY;
    });
  };
  const setHandler = (
    handler: Graphics | null,
    x: number,
    y: number,
    color = 0x00ff00,
    size = 10
  ) => {
    if (!handler) return;

    handler.circle(0, 0, 5);
    handler.fill(0xde3249, 1);
    handler.zIndex = 1000;
    handler.x = x;
    handler.y = y;
    handler.interactive = true;
    handler.cursor = "pointer";
    return handler;
  };
  /**
   * 绑定绘制工具handler
   * @param rect
   * @param info
   */
  const bindHandlers = (
    rect: Graphics,
    info: { width: number; height: number; x: number; y: number }
  ) => {
    setHandler(handlerRef.current.leftTop, info.x, info.y);
    setHandler(handlerRef.current.leftCenter, info.x, info.y + info.height / 2);
    setHandler(handlerRef.current.leftBottom, info.x, info.y + info.height);
    setHandler(handlerRef.current.topCenter, info.x + info.width / 2, info.y);
    setHandler(
      handlerRef.current.bottomCenter,
      info.x + info.width / 2,
      info.y + info.height
    );
    setHandler(handlerRef.current.rightTop, info.x + info.width, info.y);
    setHandler(
      handlerRef.current.rightCenter,
      info.x + info.width,
      info.y + info.height / 2
    );
    setHandler(
      handlerRef.current.rightBottm,
      info.x + info.width,
      info.y + info.height
    );
    setHandler(handlerRef.current.rotate, info.x + info.width / 2, info.y - 20);
    setHandler(
      handlerRef.current.rotateAnchor,
      info.x + info.width / 2,
      info.y + info.height / 2
    );

    Object.entries(handlerRef.current).forEach(([key, handler]) => {
      if (!handler) return;
      handler.on("pointerdown", (event) => {
        handlerStatusRef.current.isDragging = true;
        handlerStatusRef.current.currentHandler = handler;
        event.stopPropagation();
      });

      handler.on("pointermove", (event) => {
        if (
          !handlerStatusRef.current.isDragging ||
          handlerStatusRef.current.currentHandler !== handler
        )
          return;

        const { x, y } = event.data.global;
        const dx = x - rect.x;
        const dy = y - rect.y;

        switch (key) {
          case "leftTop":
            rect.width = Math.abs(dx * 2);
            rect.height = Math.abs(dy * 2);
            rect.x += dx / 2;
            rect.y += dy / 2;
            break;

          case "rotate":
            const angle = Math.atan2(dy, dx);
            rect.rotation = angle;
            break;

          // Add cases for other handlers...
        }

        updateHandlers(rect);
      });

      handler.on("pointerup", () => {
        handlerStatusRef.current.isDragging = false;
        handlerStatusRef.current.currentHandler = null;
      });

      handler.on("pointerupoutside", () => {
        handlerStatusRef.current.isDragging = false;
        handlerStatusRef.current.currentHandler = null;
      });
    });
  };
  /**
   * 隐藏绘制工具handler
   */
  const hideHandler = () => {
    Object.values(handlerRef.current).forEach((handler) => {
      if (!handler) return;
      handler.visible = false;
    });
  };
  /**
   * 显示绘制工具handler
   */
  const showHandler = () => {
    Object.values(handlerRef.current).forEach((handler) => {
      if (!handler) return;
      handler.visible = true;
    });
  };
  return {
    initHandler,
    bindHandlers,
    hideHandler,
    showHandler,
  };
};
