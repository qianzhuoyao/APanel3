import {
  CSSProperties,
  memo,
  RefCallback,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectionEnd,
  setSelectionNodeIdList,
  setActionType,
  setSelectionStart,
  setRoot,
} from "../Store/sceneStore";
import { INodeContent } from "../Scene/type";
import { ACTION_MODE, ACTION_TYPE } from "../Root/actionConstant";
import { useSelectionMove } from "./useSelectionMove";
import { useSelectionUp } from "./useSelectionUp";
import { Anchor } from "./anchor";
import { IActionType } from "../Root/type";
import interact from "interactjs";
import { traverseTree } from "@repo/model/NodeModel";
import { reTranslateRoot } from "../Scene/reTranslateRoot";
import { translateRoot } from "../Scene/translate";
import { useUpdateRoot } from "../Root/useUpdateRoot";

export const Node = memo(
  ({
    content,
    viewportWidth,
    viewportHeight,
  }: {
    content: INodeContent | null;
    viewportWidth: number;
    viewportHeight: number;
  }) => {
    const nodeRef = useRef<{
      x: number;
      y: number;
      width: number;
      height: number;
      angle: number;
      child: HTMLDivElement | null;
    }>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      angle: 0,
      child: null,
    });

    const setContainerRef: RefCallback<HTMLDivElement> = (node) => {
      if (node) {
        if (content) {
          //每次更新时需要预设一下
          node.style.width = content.width + "px";
          node.style.height = content.height + "px";
          node.style.left = content.x + "px";
          node.style.top = content.y + "px";
          node.style.transform = `rotate(${content.angle}deg)`;
          nodeRef.current.x = 0;
          nodeRef.current.y = 0;
          nodeRef.current.child = node;
          nodeRef.current.angle = content?.angle || 0;
          nodeRef.current.width = content?.width || 0;
          nodeRef.current.height = content?.height || 0;
        }

        interact(node).draggable({
          listeners: {
            end: () => {
              onUpdated();
            },
            move: (event) => {
              if (actionType === ACTION_TYPE.DEFAULT) {
                nodeRef.current.x += event.dx;
                nodeRef.current.y += event.dy;
                node.style.transform = `translate(${nodeRef.current.x}px, ${nodeRef.current.y}px) rotate(${nodeRef.current.angle}deg)`;
              }
            },
          },
        });
      }
    };
    const dispatch = useDispatch();

    const selectionNodeIdList = useSelector(
      (state: {
        scene: {
          selectionNodeIdList: string[];
        };
      }) => state.scene.selectionNodeIdList
    );

    const actionType = useSelector(
      (state: {
        scene: {
          actionType: IActionType;
        };
      }) => state.scene.actionType
    );

    const isVisible = useMemo(() => {
      const top = content?.y || 0;
      const left = content?.x || 0;

      return top <= viewportHeight && left <= viewportWidth;
    }, [content, viewportWidth, viewportHeight]);

    const NodeSymbolStyle: CSSProperties = useMemo(() => {
      if (content?.type === ACTION_MODE.RECT) {
        return {
          border: `${content?.strokeWidth} ${content?.strokeType} ${content?.stroke}`,
          borderRadius: `${content?.strokeRadius}`,
        };
      }
      return {};
    }, [content]);

    const root = useSelector(
      (state: {
        scene: {
          root: INodeContent;
        };
      }) => state.scene.root
    );

    const updateRoot = useUpdateRoot([content]);

    const onUpdated = useCallback(() => {
      updateRoot((item) => {
        if (item.id === content?.id) {
          item.x = content?.x + nodeRef.current.x;
          item.y = content?.y + nodeRef.current.y;
          item.angle = nodeRef.current.angle;
          item.width = nodeRef.current.width;
          item.height = nodeRef.current.height;
        }
      });
    }, [updateRoot, content]);

    const currentPickNode = useSelector(
      (state: {
        scene: {
          currentPickNode: INodeContent | null;
        };
      }) => state.scene.currentPickNode
    );

    const SelectionStyle: CSSProperties = useMemo(() => {
      if (content?.id && selectionNodeIdList.includes(content?.id)) {
        return {
          border: `2px solid green`,
        };
      }
      return {};
    }, [content?.id, selectionNodeIdList]);

    console.log(content, "conte1nt");

    const handleClick = useCallback(() => {
      console.log(content, "content");
      //pick的节点不可以被选中
      if (content?.id && content?.id !== currentPickNode?.id) {
        //单击选中
        dispatch(setSelectionNodeIdList([content?.id]));
        //变更动作类型为默认
        dispatch(setActionType(ACTION_TYPE.DEFAULT));
      }
    }, [content, currentPickNode]);

    const onMove = useCallback((position: { x: number; y: number }) => {}, []);

    const onStartRotate = useCallback((event: any) => {
      const rect = nodeRef.current.child!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const startX = event.clientX;
      const startY = event.clientY;

      // 计算初始角度，并存储在 event.interaction 中
      event.interaction.startAngle =
        (Math.atan2(startY - centerY, startX - centerX) * 180) / Math.PI;

      // 获取当前元素的transform角度
      const transform = nodeRef.current.child!.style.transform;
      const currentRotation = transform.match(/rotate\(([^deg]+)deg\)/);
      event.interaction.currentAngle = currentRotation
        ? parseFloat(currentRotation[1])
        : 0;
    }, []);

    const onRotate = useCallback((event: any) => {
      const rect = nodeRef.current.child!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const currentMouseAngle =
        (Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180) /
        Math.PI;
      let angle =
        currentMouseAngle -
        event.interaction.startAngle +
        event.interaction.currentAngle;

      nodeRef.current.child!.style.transform = `rotate(${angle}deg)`;
      nodeRef.current.angle = angle; // 更新全局角度
    }, []);

    const onResize = useCallback(
      (
        anchor: string[],
        position: { x: number; y: number; dx: number; dy: number }
      ) => {
        if (content?.type === "SCENE") {
          return;
        }

        if (nodeRef.current.child) {
          if (anchor.includes("left")) {
            nodeRef.current.width -= position.dx;
            nodeRef.current.x += position.dx;
          } else if (anchor.includes("right")) {
            nodeRef.current.width += position.dx;
          }

          if (anchor.includes("top")) {
            nodeRef.current.height -= position.dy;
            nodeRef.current.y += position.dy;
          } else if (anchor.includes("bottom")) {
            nodeRef.current.height += position.dy;
          }
          console.log(
            content?.type,
            nodeRef.current.width,
            nodeRef.current.height,
            nodeRef.current.child,
            "swwswww"
          );
          nodeRef.current.child!.style.width = nodeRef.current.width + "px";
          nodeRef.current.child!.style.height = nodeRef.current.height + "px";
          nodeRef.current.child!.style.transform = `translate(${nodeRef.current.x}px, ${nodeRef.current.y}px) rotate(${nodeRef.current.angle}deg)`;
        }
      },
      [content?.type]
    );

    if (content === null) return <></>;

    return (
      <div
        data-name={content.name}
        data-id={content.id}
        data-parent-id={content.parent}
        style={{
          display: isVisible ? "block" : "none",
          position: "absolute",
          userSelect: "none",
          ...NodeSymbolStyle,
          ...SelectionStyle,
          zIndex: content.zIndex,
        }}
        onClick={handleClick}
        ref={setContainerRef}
      >
        <Anchor
          actionType={actionType}
          content={content}
          onMove={onMove}
          onResize={onResize}
          onUpdated={onUpdated}
          onRotate={onRotate}
          onStartRotate={onStartRotate}
        >
          <div style={{ position: "relative" }}>
            {content.children?.map((child) => (
              <Node
                key={child.id}
                content={child}
                viewportWidth={viewportWidth}
                viewportHeight={viewportHeight}
              />
            ))}
          </div>
        </Anchor>
      </div>
    );
  }
);
