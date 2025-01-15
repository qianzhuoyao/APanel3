import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setSelectionEnd } from "../Store/sceneStore";
import { sceneMouseMove } from "../Scene/sceneEvent";
import { INodeContent } from "../Scene/type";

/**
 * 选中 期间鼠标移动
 * @param container 容器
 * @param content 内容
 * @param isSelecting 是否选中
 */
export const useSelectionMove = (
  container: HTMLDivElement | null,
  content: INodeContent | null,
  isSelecting: boolean
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const mouseMoveSubscription = sceneMouseMove().observable.subscribe((e) => {
      e.stopPropagation();
      if (!isSelecting) return;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const containerX = containerRect.left;
        const containerY = containerRect.top;
        dispatch(
          setSelectionEnd({
            x: e.clientX - containerX + (content?.x || 0),
            y: e.clientY - containerY + (content?.y || 0),
          })
        );
      }
    });
    return () => {
      mouseMoveSubscription.unsubscribe();
    };
  }, [content, isSelecting]);
};
