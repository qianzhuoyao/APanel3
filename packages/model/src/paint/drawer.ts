import { drawEvent } from "./drawEvent";

export const drawer = () => {
  return drawEvent({
    panel: document.body,
    onDrawFinish: (dom) => {},
  }).subscribe();
};
