import { Rxjs } from "@repo/lib";
import { computeDrawDomSizePosition } from "./drawEvent";

export type IDrawEvent = (params: {
  panel: HTMLElement;
  type?: "rect";
  onDrawFinish: (
    DOMRect: ReturnType<typeof computeDrawDomSizePosition>,
    e: MouseEvent
  ) => void;
}) => Rxjs.Observable<MouseEvent>;
