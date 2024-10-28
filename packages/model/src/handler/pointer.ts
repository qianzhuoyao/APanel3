import { CONSTANT } from "@repo/window";

export const createPointer = (attr: string) => {
  const handlerSubNodePointer = document.createElement("div");
  handlerSubNodePointer.setAttribute(
    CONSTANT.NODE_HANDLER_ATTRIBUTE.NODE_HANDLER_ATTRIBUTE_ROLE_KEY,
    attr
  );

  return handlerSubNodePointer;
};

const POINTER_POSITION_CODE = [
  "LeftTop",
  "LeftCenter",
  "LeftBottom",
  "CenterTop",
  "CenterBottom",
  "RightTop",
  "RightCenter",
  "RightBottom",
  "RotatePoint",
] as const;

export const createPointers = (node: HTMLElement) => {
  const pointerMap: Record<string, HTMLDivElement> = {};

  node.style.position = "relative";

  POINTER_POSITION_CODE.forEach((code) => {
    const pointerElement = createPointer(code);

    pointerElement.style.position = "absolute";

    if (code === "LeftTop") {
      pointerElement.style.left = "0px";
      pointerElement.style.top = "0px";
    } else if (code === "LeftCenter") {
      pointerElement.style.left = "0px";
      pointerElement.style.top = "50%";
    } else if (code === "LeftBottom") {
      pointerElement.style.left = "0px";
      pointerElement.style.bottom = "0px";
    } else if (code === "CenterTop") {
      pointerElement.style.left = "50%";
      pointerElement.style.top = "0px";
    } else if (code === "CenterBottom") {
      pointerElement.style.left = "50%";
      pointerElement.style.bottom = "0px";
    } else if (code === "RightTop") {
      pointerElement.style.top = "0px";
      pointerElement.style.right = "0px";
    } else if (code === "RightCenter") {
      pointerElement.style.top = "50%";
      pointerElement.style.right = "0px";
    } else if (code === "RightBottom") {
      pointerElement.style.bottom = "0px";
      pointerElement.style.right = "0px";
    } else if (code === "RotatePoint") {
      pointerElement.style.top = "-10px";
      pointerElement.style.left = "50%";
    }

    pointerMap[code] = pointerElement;
    node.appendChild(pointerElement);
  });

  return pointerMap;
};
