import {
  useRef,
  useEffect,
  useCallback,
  CSSProperties,
  useState,
  useMemo,
  RefCallback,
} from "react";
import { Node } from "../Node";
import { useDispatch, useSelector } from "react-redux";
import { createNode } from "@repo/model/NodeModel";
import { setRoot } from "../Store/sceneStore";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { translateRoot } from "./translate";
import { INodeContent, ISceneProp } from "./type";
import cn from "clsx";

/**
 * 场景容器
 * @param width
 * @param height
 * @returns
 */
export const SceneContainer = ({ style, className }: ISceneProp) => {
  const selectionRef = useRef<HTMLDivElement>(null);

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
  const isSelecting = useSelector(
    (state: {
      scene: {
        isSelecting: boolean;
      };
    }) => state.scene.isSelecting
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

  /**
   * 选框左上角坐标
   */
  const selectionLeft = useMemo(() => {
    if (!selectionStart || !selectionEnd) return 0;
    return Math.min(selectionStart.x, selectionEnd.x);
  }, [selectionStart, selectionEnd]);

  /**
   * 选框上边坐标
   */
  const selectionTop = useMemo(() => {
    if (!selectionStart || !selectionEnd) return 0;
    return Math.min(selectionStart.y, selectionEnd.y);
  }, [selectionStart, selectionEnd]);

  const root = useSelector(
    (state: {
      scene: {
        root: INodeContent;
      };
    }) => state.scene.root
  );

  const dispatch = useDispatch();
  /**
   * size是根据style来显示的，此ref仅仅记录大小用于计算
   */
  const sizeRef = useRef({ width: 0, height: 0 });

  const containerRef: RefCallback<HTMLDivElement> = (node) => {
    const rect = node?.getBoundingClientRect();
    if (rect) {
      sizeRef.current = { width: rect.width, height: rect.height };
    }
  };

  /**
   * 拖拽结束
   * @param event
   */
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    console.log(event);
  }, []);

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
      width: sizeRef.current.width,
      height: sizeRef.current.height,
    });
    dispatch(setRoot(translateRoot(Root.node)));
  }, [style]);

  /**
   * 选框样式
   */
  const selectionStyle: CSSProperties = {
    position: "absolute",
    left: selectionLeft,
    top: selectionTop,
    width: selectionWidth,
    height: selectionHeight,
    border: "1px dashed blue",
    pointerEvents: "none", // 避免选框遮挡元素
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div
        /**
         * 实际上 允许 style 来变更 容器 position
         */
        className={cn(className, "relative")}
        style={{
          ...style,
        }}
        ref={containerRef}
      >
        <div className="w-full h-full overflow-hidden relative">
          {(selectionWidth || selectionHeight) && isSelecting ? (
            <div ref={selectionRef} style={selectionStyle}></div>
          ) : null}
          <Node
            content={root}
            viewportWidth={sizeRef.current.width}
            viewportHeight={sizeRef.current.height}
          ></Node>
        </div>
      </div>
    </DndContext>
  );
};
