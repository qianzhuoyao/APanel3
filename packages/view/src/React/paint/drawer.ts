import { drawEvent } from "./drawEvent";

export const drawer = ({
  onDrawFinish,
}: {
  onDrawFinish: (
    rect: {
      width: number;
      height: number;
      left: number;
      top: number;
    },
    e: MouseEvent
  ) => void;
}) => {
  return drawEvent({
    panel: document.body,
    onDrawFinish,
  }).subscribe();
};
