import { useCallback, useMemo, useRef, useState } from "react";
import { ISceneType } from "../type";
import { drag, EVENT_NAME } from "@repo/core";
import { Subscription } from "rxjs";
import { useCreateEmptyBlock } from "./useCreateEmptyBlock";

export const useCreateEmptyEvent = () => {
  const eleRef = useRef<ISceneType["target"]>(null);
  const createEventSubscription = useRef<Subscription | null>(null);

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const emptyBlock = useCreateEmptyBlock({
    startX,
    startY,
    width,
    height,
  });

  const createEvent = useCallback((ele: HTMLDivElement) => {
    return drag({
      target: ele,
    }).subscribe((e) => {
      if (e.eventName === EVENT_NAME.MOUSE_DOWN) {
        setStartX(e.down.pageX);
        setStartY(e.down.pageY);
      } else if (e.eventName === EVENT_NAME.MOUSE_MOVE) {
        if (e.move?.pageX && e.move?.pageX < e.down.pageX) {
          setStartX(e.move.pageX);
        }
        if (e.move?.pageY && e.move?.pageY < e.down.pageY) {
          setStartY(e.move.pageY);
        }
        console.log(Math.abs((e.move?.pageX || 0) - e.down.pageX),'zxzz')
        setWidth(Math.abs((e.move?.pageX || 0) - e.down.pageX));
        setHeight(Math.abs((e.move?.pageY || 0) - e.down.pageY));
      } else {
        setWidth(0);
        setHeight(0);
      }
    });
  }, []);

  const registry = useCallback((ele: ISceneType["target"]) => {
    if (ele) {
      eleRef.current = ele;
      // if (createEventSubscription.current) {
      //   createEventSubscription.current.unsubscribe();
      //   createEventSubscription.current = null;
      // }
      createEventSubscription.current = createEvent(ele);
    }
  }, []);

  return {
    registry,
    emptyBlock,
  };
};
