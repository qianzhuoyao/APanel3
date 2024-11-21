import { Rxjs } from "@repo/lib";

export type IDrawEvent = (params: {
  panel: HTMLElement;
  type?: "rect";
  onDrawFinish: (dom: HTMLElement, e: MouseEvent) => void;
}) => Rxjs.Observable<MouseEvent>;
