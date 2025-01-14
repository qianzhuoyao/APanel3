import {
  CSSProperties,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { INode } from "@repo/model/NodeModel/type";
import { useDispatch, useSelector } from "react-redux";
import { createNode, getNodeRTree, nodeMap } from "@repo/model/NodeModel";
import {
  setActionMode,
  setIsSelecting,
  setRoot,
  setSelectionEnd,
  setSelectionNodeIdList,
  setSelectionStart,
} from "../Store/sceneStore";
import { translateRoot } from "../Scene/translate";
import { INodeContent } from "../Scene/type";
import { sceneMouseMove, sceneMouseUp } from "../Scene/sceneEvent";
import { IActionMode } from "../Root/type";
import { ACTION_MODE } from "../Root/actionConstant";

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
    const actionMode = useSelector(
      (state: {
        scene: {
          actionMode: IActionMode;
        };
      }) => state.scene.actionMode
    );
    const isSelecting = useSelector(
      (state: {
        scene: {
          isSelecting: boolean;
        };
      }) => state.scene.isSelecting
    );
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
    const root = useSelector(
      (state: {
        scene: {
          root: INode;
        };
      }) => state.scene.root
    );

    /**
     * 鼠标按下
     * @param e
     */
    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e, "dasdwdwwwww");
        e.preventDefault();
        e.stopPropagation();
        dispatch(setSelectionEnd(null));
        dispatch(setIsSelecting(true));

        if (containerRef.current) {
          console.log(content, "content");
          const containerRect = containerRef.current.getBoundingClientRect();
          const containerX = containerRect.left;
          const containerY = containerRect.top;

          dispatch(
            setSelectionStart({
              x: e.clientX - containerX + (content?.x || 0),
              y: e.clientY - containerY + (content?.y || 0),
            })
          );
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

    useEffect(() => {
      const mouseMoveSubscription = sceneMouseMove().observable.subscribe(
        (e) => {
          e.stopPropagation();
          if (!isSelecting) return;
          if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const containerX = containerRect.left;
            const containerY = containerRect.top;
            dispatch(
              setSelectionEnd({
                x: e.clientX - containerX + (content?.x || 0),
                y: e.clientY - containerY + (content?.y || 0),
              })
            );
          }
        }
      );
      return () => {
        mouseMoveSubscription.unsubscribe();
      };
    }, [content, isSelecting]);

    /**
     * 选框左上角坐标
     */
    const selectionLeft = useMemo(() => {
      if (!selectionStart || !selectionEnd) return 0;
      return Math.min(selectionStart.x, selectionEnd.x);
    }, [selectionStart, selectionEnd]);

    const selectionTop = useMemo(() => {
      if (!selectionStart || !selectionEnd) return 0;
      return Math.min(selectionStart.y, selectionEnd.y);
    }, [selectionStart, selectionEnd]);

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
     * 鼠标抬起
     * 放外边去，通过树选择来绘制对应位置
     */
    useEffect(() => {
      const mouseUpSubscription = sceneMouseUp().observable.subscribe((e) => {
        dispatch(setIsSelecting(false));

        if (e.target instanceof HTMLElement) {
          const currentNode = nodeMap().get(
            e.target?.getAttribute("data-id") || ""
          );
          const rootNode = nodeMap().get(root.id);
          //创建正方形节点
          if (actionMode === ACTION_MODE.RECT) {
            if (currentNode && rootNode) {
              // 创建节点
              createNode({
                parent: currentNode,
                type: ACTION_MODE.RECT,
                name: "矩形节点",
                x: selectionLeft,
                strokeWidth: "1px",
                strokeType: "solid",
                strokeRadius: "4px",
                fill: "#ffffff",
                stroke: "#1b1b1f",
                y: selectionTop,
                width: selectionWidth,
                height: selectionHeight,
              });
              // 更新根节点
              const newRoot = translateRoot(rootNode);
              console.log(newRoot, rootNode, "newRootsss");
              dispatch(setRoot(newRoot));
              dispatch(setActionMode(ACTION_MODE.MOUSE));
            }
          } else if (actionMode === ACTION_MODE.MOUSE) {
            //选中效果
          }
        }

        dispatch(setSelectionStart(null));
        dispatch(setSelectionEnd(null));
      });

      return () => {
        mouseUpSubscription.unsubscribe();
      };
    }, [
      isSelecting,
      selectionLeft,
      selectionTop,
      selectionWidth,
      selectionHeight,
    ]);

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
