import { CSSProperties, memo, useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsSelecting,
  setSearchNodeContainer,
  setSelectionEnd,
  setSelectionStart,
} from "../Store/sceneStore";
import { INodeContent } from "../Scene/type";
import { ACTION_MODE } from "../Root/actionConstant";
import { useSelectionMove } from "./useSelectionMove";
import { useSelectionUp } from "./useSelectionUp";

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
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const isSelecting = useSelector(
      (state: {
        scene: {
          isSelecting: boolean;
        };
      }) => state.scene.isSelecting
    );

    /**
     * 鼠标按下
     * @param e
     */
    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e, "dasdwdwwwww");
        if (e.button === 0) {
          e.preventDefault();
          e.stopPropagation();
          dispatch(setSelectionEnd(null));
          dispatch(setIsSelecting(true));

          if (containerRef.current) {
            console.log(content, "content");
            const containerRect = containerRef.current.getBoundingClientRect();
            const containerX = containerRect.left;
            const containerY = containerRect.top;

            dispatch(setSearchNodeContainer(content));

            dispatch(
              setSelectionStart({
                x: e.clientX - containerX + (content?.x || 0),
                y: e.clientY - containerY + (content?.y || 0),
              })
            );
          }
        }
      },
      [content]
    );

    const selectionNodeIdList = useSelector(
      (state: {
        scene: {
          selectionNodeIdList: string[];
        };
      }) => state.scene.selectionNodeIdList
    );

    useSelectionMove(containerRef.current, content, isSelecting);

    useSelectionUp();
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

    const SelectionStyle: CSSProperties = useMemo(() => {
      if (content?.id && selectionNodeIdList.includes(content?.id)) {
        return {
          border: `2px solid green`,
        };
      }
      return {};
    }, [isSelecting, content?.id, selectionNodeIdList]);

    console.log(content, "conte1nt");

    if (content === null) return <></>;

    return (
      <div
        data-name={content.name}
        data-id={content.id}
        data-parent-id={content.parent}
        style={{
          display: isVisible ? "block" : "none",
          position: "absolute",
          left: content.x + "px",
          top: content.y + "px",
          width: content.width + "px",
          height: content.height + "px",
          ...NodeSymbolStyle,
          ...SelectionStyle,
        }}
        onMouseDown={handleMouseDown}
        ref={containerRef}
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
      </div>
    );
  }
);
