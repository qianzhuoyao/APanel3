import { RefCallback, useRef } from "react";
import { createPermissionHandler } from "../handler";

type ISetter = (h: ReturnType<typeof createPermissionHandler> | void) => void;

export const useCreatePermissionHandler = () => {
  const handlerRef = useRef<{
    setter: ISetter;
  }>({ setter: () => void 0 });

  const setRef: RefCallback<HTMLElement> = (dom) => {
    if (dom instanceof HTMLElement) {
      const h = createPermissionHandler({
        node: dom,
        selected: true,
      });
      handlerRef.current.setter(h);
    }
  };

  const setHandler = (setter: ISetter) => {
    handlerRef.current.setter = setter;
  };

  return {
    setHandler,
    setRef,
  };
};
