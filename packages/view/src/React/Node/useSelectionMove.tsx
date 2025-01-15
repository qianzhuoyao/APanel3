import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSelectionEnd } from "../Store/sceneStore";
import { sceneMouseMove } from "../Scene/sceneEvent";
import { INodeContent } from "../Scene/type";
import { IActionType } from "../Root/type";
import { ACTION_TYPE } from "../Root/actionConstant";

/**
 * 选中 期间鼠标移动
 * @param container 容器
 * @param content 内容
 * @param actionType 动作类型
 */
export const useSelectionMove = () => {
  const dispatch = useDispatch();

  const actionType = useSelector(
    (state: {
      scene: {
        actionType: IActionType;
      };
    }) => state.scene.actionType
  );
  useEffect(() => {
    const mouseMoveSubscription = sceneMouseMove().observable.subscribe((e) => {
      e.stopPropagation();
      if (actionType !== ACTION_TYPE.SELECT) return;
      dispatch(
        setSelectionEnd({
          x: e.pageX,
          y: e.pageY,
        })
      );
    });
    return () => {
      mouseMoveSubscription.unsubscribe();
    };
  }, [actionType]);
};
