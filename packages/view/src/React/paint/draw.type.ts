import { computeDrawDomSizePosition } from "./drawEvent";
import * as Rxjs from "rxjs";
export type IDrawEvent = (params: {
  panel: HTMLElement;
  type?: "rect";
  onDrawFinish: (
    DOMRect: ReturnType<typeof computeDrawDomSizePosition>,
    e: MouseEvent
  ) => void;
}) => Rxjs.Observable<MouseEvent>;
