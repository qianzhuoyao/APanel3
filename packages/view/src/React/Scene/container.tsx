import {
  useRef,
  useEffect,
  useCallback,
  CSSProperties,
  useMemo,
  RefCallback,
  useState,
} from "react";
import { Node } from "../Node";
import { useDispatch, useSelector } from "react-redux";
import { createNode, getNodeRTree } from "@repo/model/NodeModel";
import {
  setActionType,
  setCurrentPickNode,
  setRoot,
  setSelectionEnd,
  setSelectionNodeIdList,
  setSelectionStart,
} from "../Store/sceneStore";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { translateRoot } from "./translate";
import { INodeContent, ISceneProp } from "./type";
import cn from "clsx";
import { useSyncRTree } from "../Root/useSyncRTree";
import { IActionMode, IActionType } from "../Root/type";
import { ACTION_MODE, ACTION_TYPE } from "../Root/actionConstant";
import { useWindowEvent } from "../Hook/useWindowEvent";
import { useSelectionUp } from "../Node/useSelectionUp";
import { useSelectionMove } from "../Node/useSelectionMove";
import { inSomeRTreeNode } from "./inSomeRTreeNode";
import { LEVEL } from "../Root/level";

/**
 * 场景容器
 * @param width
 * @param height
 * @returns
 */
export const SceneContainer = ({ style, className }: ISceneProp) => {
  const [isShowBothSelection, setIsShowBothSelection] = useState<void | {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  }>(void 0);

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

  const actionType = useSelector(
    (state: {
      scene: {
        actionType: IActionType;
      };
    }) => state.scene.actionType
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
  const selectionEffectiveScope = useSelector(
    (state: {
      scene: {
        selectionEffectiveScope: number;
      };
    }) => state.scene.selectionEffectiveScope
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

  const actionMode = useSelector(
    (state: {
      scene: {
        actionMode: IActionMode;
      };
    }) => state.scene.actionMode
  );

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
      rootOffsetX: 0,
      zIndex: LEVEL.scene,
      rootOffsetY: 0,
    });
    const RootContent = translateRoot(Root.node);
    dispatch(setRoot(RootContent));
    dispatch(setCurrentPickNode(RootContent));
  }, [style]);
  /**
   * 同步rTree
   */
  useSyncRTree();

  const selectionNodeList = useSelector(
    (state: {
      scene: {
        selectionNodeList: INodeContent[];
      };
    }) => state.scene.selectionNodeList
  );

  //10 范围内忽略
  const showSelection = useMemo(() => {
    return (
      (selectionWidth || selectionHeight) &&
      actionType === ACTION_TYPE.SELECT &&
      selectionWidth >= selectionEffectiveScope &&
      selectionHeight >= selectionEffectiveScope
    );
  }, [
    selectionWidth,
    selectionHeight,
    actionType,
    selectionEffectiveScope,
    selectionNodeList,
  ]);

  const selectedNode = useMemo(() => {
    return getNodeRTree()
      .search({
        minX: selectionLeft,
        minY: selectionTop,
        maxX: selectionLeft + selectionWidth,
        maxY: selectionTop + selectionHeight,
      })
      .filter((item) => {
        return (
          item.minX >= selectionLeft &&
          item.minY >= selectionTop &&
          item.maxX <= selectionLeft + selectionWidth &&
          item.maxY <= selectionTop + selectionHeight
        );
      });
  }, [selectionLeft, selectionTop, selectionWidth, selectionHeight]);

  /**
   * 选中状态
   */
  useEffect(() => {
    //选中状态 只选中当前节点下的子节点们 这个很重要
    if (actionType === ACTION_TYPE.SELECT) {
      if (actionMode === ACTION_MODE.MOUSE) {
        if (showSelection) {
          //完全融入
          dispatch(setSelectionNodeIdList(selectedNode.map((item) => item.id)));
        }
      }
    }
  }, [selectedNode, actionType]);

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

  const selectionNodeIdList = useSelector(
    (state: {
      scene: {
        selectionNodeIdList: string[];
      };
    }) => state.scene.selectionNodeIdList
  );

  useSelectionMove();

  useSelectionUp();

  const handleRootMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (e.button === 0) {
        //获取鼠标此时悬浮在的节点集合
        const handlerInNodeList = inSomeRTreeNode({
          x: e.pageX,
          y: e.pageY,
        });
        const handlerInNodeIdList = handlerInNodeList.map((item) => item.id);
        console.log(handlerInNodeList,'handlerInNodeListe1e21')
        if (handlerInNodeList.length !== 0) {
          if (
            selectionNodeIdList.some((node) =>
              handlerInNodeIdList.includes(node)
            )
          ) {
            //存在选中则不变 可移动
            dispatch(setActionType(ACTION_TYPE.DEFAULT));
          } else {
            //不存在选中则选中
            dispatch(setActionType(ACTION_TYPE.SELECT));
            dispatch(setSelectionNodeIdList([]));
          }
        } else {
          dispatch(setSelectionNodeIdList([]));
          dispatch(setActionType(ACTION_TYPE.SELECT));
        }

        dispatch(setSelectionEnd(null));

        dispatch(
          setSelectionStart({
            x: e.pageX,
            y: e.pageY,
          })
        );
      }
    },
    [selectionNodeIdList]
  );

  const selectionBothStyle: CSSProperties = {
    position: "absolute",
    left: (isShowBothSelection?.minX || 0) + "px",
    top: (isShowBothSelection?.minY || 0) + "px",
    width:
      (isShowBothSelection?.maxX || 0) -
      (isShowBothSelection?.minX || 0) +
      "px",
    height:
      (isShowBothSelection?.maxY || 0) -
      (isShowBothSelection?.minY || 0) +
      "px",
    border: "1px dashed red",
    pointerEvents: "none", // 避免选框遮挡元素
  };

  const handleRootMouseUp = useCallback(() => {
    if (selectionNodeIdList.length > 1) {

      // const selectedNode = selectionNodeIdList.map(id=>{
      //   return 1
      // })

      setIsShowBothSelection(() => {
        console.log(selectedNode, "selectedNodesss");
        if (selectedNode.length > 0) {
          const mbr = selectedNode.reduce(
            (acc, item) => {
              return {
                minX: Math.min(acc.minX, item.minX),
                minY: Math.min(acc.minY, item.minY),
                maxX: Math.max(acc.maxX, item.maxX),
                maxY: Math.max(acc.maxY, item.maxY),
              };
            },
            { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
          ); // 初始值很重要

          console.log("Minimum Bounding Rectangle (MBR):", mbr);
          return mbr;
        } else {
          // console.log("No results found.");
          return void 0;
        }
      });
    } else {
      setIsShowBothSelection(void 0);
    }
  }, [selectedNode]);

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
        onMouseDown={handleRootMouseDown}
        onMouseUp={handleRootMouseUp}
        ref={containerRef}
      >
        <div className="w-full h-full overflow-hidden relative">
          {showSelection ? (
            <div ref={selectionRef} style={selectionStyle}></div>
          ) : null}
          {isShowBothSelection ? <div style={selectionBothStyle}></div> : null}
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
