import { fromEvent, switchMap, map, takeUntil, tap, filter } from "rxjs";
import { BaseNode, ShapeNode } from "@repo/model/NodeManager/type";
import { v4 } from "uuid";
import { getRenderStore } from "../../Store";
import { IActionMode } from "../Root/type";
import { ACTION_MODE } from "../Root/actionConstant";

export function createDraggableRect(
  action: IActionMode,
  container: HTMLElement,
  event: {
    createdCallback: (node: BaseNode) => void;
  }
) {
  const mouseDown$ = fromEvent<MouseEvent>(container, "mousedown");
  const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove");
  const mouseUp$ = fromEvent<MouseEvent>(document, "mouseup");

  const createSubscription = mouseDown$
    .pipe(
      filter(() => action === ACTION_MODE.RECT),
      switchMap((startEvent) => {
        const rect = document.createElement("div");
        rect.classList.add("target");
        rect.style.position = "absolute";
        rect.style.border = "1px solid black";
        rect.style.backgroundColor = "rgba(0, 0, 255, 0.3)";
        container.appendChild(rect);
        rect.setAttribute("attr", "RECT");
        const startX = startEvent.clientX;
        const startY = startEvent.clientY;
        rect.style.left = `${startX}px`;
        rect.style.top = `${startY}px`;

        return mouseMove$.pipe(
          map((moveEvent) => {
            const width = Math.abs(moveEvent.clientX - startX);
            const height = Math.abs(moveEvent.clientY - startY);
            rect.style.width = `${width}px`;
            rect.style.height = `${height}px`;

            if (moveEvent.clientX < startX) {
              rect.style.left = `${moveEvent.clientX}px`;
            }
            if (moveEvent.clientY < startY) {
              rect.style.top = `${moveEvent.clientY}px`;
            }
          }),
          takeUntil(
            mouseUp$.pipe(
              tap(() => {
                const id = v4();
                rect.id = "rect-" + id;
                const { width, height, top, left } =
                  rect.getBoundingClientRect();
                const rectangleNode: ShapeNode = {
                  id: rect.id,
                  type: "shape",
                  zIndex: 1,
                  shapeType: "rectangle",
                  position: { x: left, y: top },
                  size: { width, height },
                  fillColor: "#FF5733",
                  strokeColor: "#000000",
                  strokeWidth: 2,
                };

                getRenderStore().nodeManager.addNode(rectangleNode);
                event.createdCallback(rectangleNode);
              })
            )
          )
        );
      })
    )
    .subscribe();

  return {
    createSubscription,
    mouseDown$,
    mouseUp$,
    mouseMove$,
  };
}
