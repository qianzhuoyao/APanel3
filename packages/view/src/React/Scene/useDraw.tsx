import { Application, Graphics, Rectangle } from "pixi.js";
import { useEffect, useRef } from "react";
import { useHandler } from "./useHandler";

/**
 * 基于事件的绘制，不涉及编辑
 * @param param0
 */
export const useDraw = ({ app }: { app: Application | null }) => {
  const allNodeRef = useRef<{
    _selected: Set<string>;
    _map: Map<
      string,
      {
        width: number;
        height: number;
        x: number;
        y: number;
      }
    >;
  }>({
    _selected: new Set(),
    _map: new Map(),
  });
  /**
   * 绘制工具handler
   */
  const { bindHandlers, initHandler, hideHandler, showHandler } = useHandler();
  /**
   * 绘制图形
   * @param param0
   * @returns
   */
  const drawGraphic = ({
    width,
    height,
    x,
    y,
  }: {
    width: number;
    height: number;
    x: number;
    y: number;
  }) => {
    const g = new Graphics();
    g.interactive = true;
    g.hitArea = new Rectangle(0, 0, width, height);
    g.x = x;
    g.y = y;
    g.roundRect(0, 0, width, height, 0);
    g.fill("#ffffff", 0.25);
    g.stroke({ width: 2, color: "#e1e1e1" });
    allNodeRef.current._map.set(g.uid.toString(), {
      width,
      height,
      x,
      y,
    });
    app?.stage.addChild(g);
    return {
      g,
      setGraphicSelected: () => {
        allNodeRef.current._selected.add(g.uid.toString());
        g.clear();
        g.roundRect(0, 0, width, height, 0);
        g.fill("#ffffff", 0.25);
        g.stroke({ width: 2, color: "green" });
        const info = allNodeRef.current._map.get(g.uid.toString());
        if (info) {
          bindHandlers(g, info);
          showHandler();
        }
      },
    };
  };
  /**
   * 查询选中
   * @param uid
   * @returns
   */
  const querySelected = (uid: string) => {
    return allNodeRef.current._selected.has(uid);
  };
  /**
   * 重置选中
   */
  const resetSelected = () => {
    app?.stage.children.forEach((child) => {
      if (child instanceof Graphics) {
        allNodeRef.current._selected.delete(child.uid.toString());
        const node = allNodeRef.current._map.get(child.uid.toString());
        if (node) {
          child.roundRect(0, 0, node.width, node.height, 0);
          child.fill("#ffffff", 0.25);
          child.stroke({ width: 2, color: "#e1e1e1" });
          hideHandler();
        }
      }
    });
  };

  return {
    drawGraphic,
    querySelected,
    resetSelected,
    initHandler,
  };
};
