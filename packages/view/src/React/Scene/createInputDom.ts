import { filter, fromEvent, map } from "rxjs";
import { IActionMode } from "../Root/type";
import { BaseNode, TextNode } from "@repo/model/NodeManager/type";
import { ACTION_MODE } from "../Root/actionConstant";
import { getRenderStore } from "../../Store";
import { v4 } from "uuid";

export const createInputDom = (
  action: IActionMode,
  container: HTMLElement,
  event: {
    createdCallback: (node: BaseNode) => void;
  }
) => {
  const mouseUp$ = fromEvent<MouseEvent>(document, "mouseup");

  const createSubscription = mouseUp$
    .pipe(
      filter(() => action === ACTION_MODE.TEXT),
      map((startEvent) => {
        const text = document.createElement("div");
        text.setAttribute("attr", "TEXT");
        container.appendChild(text);
        text.contentEditable = "true";
        text.classList.add("target");
        text.style.position = "absolute";
        text.style.whiteSpace = "normal"; // 允许换行
        text.style.wordBreak = "break-word"; // 处理长单词换行

        text.style.border = "1px solid black";

        const startX = startEvent.clientX;
        const startY = startEvent.clientY;
        text.style.width = "fit-content";
        text.style.outline = "none";
        text.style.border = "none";
        text.style.minWidth = "2px";
        text.style.left = `${startX}px`;
        text.textContent = "";
        text.style.top = `${startY}px`;
        text.focus();
        text.ondblclick = () => {
          console.log("ccccccc");
          text.focus();
        };
        const id = v4();
        text.id = "text-" + id;
        const { width, height, top, left } = text.getBoundingClientRect();
        const textNode: TextNode = {
          id: text.id,
          type: "text",
          text: "",
          zIndex: 1,
          color: "#000000",
          fontFamily: "",
          fontSize: 12,
          position: { x: left, y: top },
          size: { width, height },
        };
        getRenderStore().nodeManager.addNode(textNode);
        event.createdCallback(textNode);
      })
    )
    .subscribe();
  return {
    mouseUp$,
    createSubscription,
  };
};
