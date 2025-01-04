import { RefCallback, useRef } from "react";
import { addModel, getModel } from "../block";
import { IHandlerResult } from "../handler";
import { hasModel } from "../block/blockModel";

export const useSyncMode = () => {
  const setRef: RefCallback<HTMLElement> = (dom) => {
    if (dom instanceof HTMLElement) {
      const name = dom.getAttribute("data-bind-name");
      const groupId = dom.getAttribute("data-bind-group-id");
      if (groupId && hasModel(groupId)) {
        return;
      }
      let latest: IHandlerResult | void = void 0;
      if (groupId && name) {
        const h = addModel(dom, {
          name,
          groupId,
        });
        latest = h.handler?.addEventListener("click", () => {
          latest = latest?.setSelected(true);
        });
      }
    }
  };

  return setRef;
};

