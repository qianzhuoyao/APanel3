import { Rxjs, Uuid } from "@repo/lib";
import { IDrawEvent } from "./draw.type";
import { BODY_TAG } from "./constant";
// [startX startY endX endY]
export const computeDrawDomSizePosition = (position: number[]) => {
  console.log(position, "position");
  const width = Math.abs(position[0] - position[2]);
  const height = Math.abs(position[1] - position[3]);

  const left = Math.min(position[0], position[2]);
  const top = Math.min(position[1], position[3]);
  return {
    width,
    height,
    left,
    top,
  };
};

const findDrawDom = (drawDomID: string | null) => {
  if (!drawDomID) {
    const dom = document.createElement("div");
    document.body.appendChild(dom);
    dom.style.position = "absolute";
    dom.id = Uuid.v4();
    document.body.setAttribute(BODY_TAG.HAS_DRAW, dom.id);
    return dom;
  }
  const existDom = document.getElementById(drawDomID);
  if (!existDom) {
    throw new ReferenceError("not find draw dom");
  }
  return existDom;
};

export const drawEvent: IDrawEvent = ({ type, panel, onDrawFinish }) => {
  const mouseDown$ = Rxjs.fromEvent<MouseEvent>(panel, "mousedown");
  const mouseUp$ = Rxjs.fromEvent<MouseEvent>(document.body, "mouseup");
  const mouseMove$ = Rxjs.fromEvent<MouseEvent>(document.body, "mousemove");
  const drawDomID = document.body.getAttribute(BODY_TAG.HAS_DRAW);
  const dom = findDrawDom(drawDomID);
  return mouseDown$.pipe(
    Rxjs.tap(() => {
      console.log("12312312312312-2");
    }),
    Rxjs.map((downEvent) => ({
      downLeft: downEvent.clientX,
      downTop: downEvent.clientY,
    })),
    Rxjs.switchMap((across) =>
      mouseMove$.pipe(
        Rxjs.tap((moveEvent) => {
          const { width, height, left, top } = computeDrawDomSizePosition([
            across.downLeft,
            across.downTop,
            moveEvent.clientX,
            moveEvent.clientY,
          ]);
          dom.style.width = width + "px";
          dom.style.height = height + "px";
          dom.style.left = left + "px";
          dom.style.top = top + "px";
          dom.style.background = "red";
          if (type === "rect" || type === void 0) {
            //rect
          }

          if (width > 10 && height > 10) {
            dom.style.display = "block";
          }
        }),
        Rxjs.takeUntil(
          mouseUp$.pipe(
            Rxjs.tap((upEvent) => {
              const rect = computeDrawDomSizePosition([
                across.downLeft,
                across.downTop,
                upEvent.clientX,
                upEvent.clientY,
              ]);
              if (rect.width > 10 && rect.height > 10) {
                onDrawFinish(rect, upEvent);
              }
              dom.style.display = "none";
            })
          )
        )
      )
    )
  );
};
