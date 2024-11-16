import { RefCallback, useEffect, useRef } from "react";
import { createPermissionHandler } from "../handler";

export const useCreatePermissionHandler = () => {
  const handlerRef = useRef<{
    dom: HTMLElement | null;
    h: ReturnType<typeof createPermissionHandler> | void;
  }>({ h: void 0, dom: null });
  useEffect(() => {
    console.log(handlerRef.current.dom);

    if (handlerRef.current.dom) {
      const h = createPermissionHandler({
        node: handlerRef.current.dom,
        selected: true,
      });

      handlerRef.current.h = h;

      return () => {
        h.handler.remove();
      };
    }
  }, []);

  const setRef: RefCallback<HTMLElement> = (e) => {
    handlerRef.current.dom = e;
  };

  return {
    ...handlerRef.current.h,
    setRef,
  };
};
