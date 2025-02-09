import { RefCallback, useEffect, useRef } from "react";
import { IActionMode } from "../Root/type";
import { createDraggableRect } from "./createRectDom";
import { useInteraction } from "./setInteraction";
import { getRenderStore } from "../../Store";

export const useSetDomScene = (action: IActionMode) => {
  const domRef = useRef<{ dom: HTMLElement | null }>({
    dom: null,
  });

  const { setContainer, destory } = useInteraction();

  const setRef: RefCallback<HTMLElement> = (dom) => {
    if (dom) {
      domRef.current.dom = dom;
    }
  };

  useEffect(() => {
    if (domRef.current.dom) {
      //设置容器
      setContainer(domRef.current.dom);

      const { createSubscription: rectSubscription } = createDraggableRect(
        action,
        domRef.current.dom,
        {
          createdCallback: () => {
            getRenderStore()
              .nodeManager.getNodes()
              .map((node) => document.getElementById(node.id))
              .filter((a) => !!a);
          },
        }
      );

      return () => {
        rectSubscription.unsubscribe();
        destory();
      };
    }
  }, [action]);

  return {
    setRef,
  };
};
