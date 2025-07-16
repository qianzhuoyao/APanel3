import { CSSProperties, RefCallback, useRef } from "react";
import { ISceneType } from "../type";
import { defaultCreateBlockEvent } from "../Drawer/useCreateEvent";
import { useCreateEmptyEvent } from "./useCreateEmptyEvent";
import { Placeholder } from "../Drawer/Placeholder";

export const useApanel = () => {
  const { registry, emptyBlock } = useCreateEmptyEvent();

  const setSceneRef: RefCallback<ISceneType["target"]> = (
    target: HTMLDivElement
  ) => {
    registry(target);
  };

  return {
    setSceneRef,
    placeholder: (
      className: string,
      style: CSSProperties,
      attr: Record<string, string>
    ) => (
      <Placeholder
        emptyBlock={emptyBlock(className, style, attr)}
      ></Placeholder>
    ),
  };
};
