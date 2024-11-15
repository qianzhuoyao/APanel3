import { CONSTANT } from "@repo/window";

const pointerSize = [5, 5]; // width height

/**
 * 为了定位准确需要优先设置容器
 *
 * @param   {HTMLElement}  node  [node description]
 *
 * @return  {[type]}             [return description]
 */
const setPointerContainerDefault = (node: HTMLElement, groupId: string) => {
  node.style.position = "absolute";
  node.style.left = "0px";
  node.style.top = "0px";
  node.style.width = "100%";
  node.style.height = "100%";
  node.style.pointerEvents = "none";
  node.setAttribute(CONSTANT.NODE.ROLE.GROUP_SOLVE_CONTAINER_KEY, groupId);
  node.setAttribute(
    CONSTANT.NODE_HANDLER_ATTRIBUTE.NODE_HANDLER_ATTRIBUTE_CONTAINER,
    "1"
  );
};

/**
 * 基于父容器来设置锚点位置
 *
 * @param   {HTMLElement}  pointerElement  [pointerElement description]
 *
 * @return  {[type]}                       [return description]
 */
const setPointerDefaultStyle = (pointerElement: HTMLElement) => {
  pointerElement.style.position = "absolute";
  pointerElement.style.pointerEvents = "all";
  pointerElement.style.backgroundColor = "red";
  pointerElement.style.width = pointerSize[0] + "px";
  pointerElement.style.height = pointerSize[1] + "px";
  pointerElement.style.cursor = "pointer";
};

/**
 * 创建锚点
 *
 * @param   {string}  attr  [attr description]
 *
 * @return  {[type]}        [return description]
 */
export const createPointer = (attr: string, groupId: string) => {
  const handlerSubNodePointer = document.createElement("div");
  handlerSubNodePointer.setAttribute(
    CONSTANT.NODE.ROLE.GROUP_SOLVE_ANCHOR_KEY,
    groupId
  );
  handlerSubNodePointer.setAttribute(
    CONSTANT.NODE_HANDLER_ATTRIBUTE.NODE_HANDLER_ATTRIBUTE_ROLE_KEY,
    attr
  );

  return handlerSubNodePointer;
};

export const POINTER_POSITION_CODE = [
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

/**
 * 创建所有锚点
 *
 * @param   {HTMLElement}  node  [node description]
 *
 * @return  {[type]}             [return description]
 */
export const createPointers = (node: HTMLElement, groupId: string) => {
  const pointerMap = {} as Record<
    (typeof POINTER_POSITION_CODE)[number],
    HTMLDivElement
  >;

  setPointerContainerDefault(node, groupId);

  POINTER_POSITION_CODE.forEach((code) => {
    const pointerElement = createPointer(code, groupId);
    setPointerDefaultStyle(pointerElement);
    pointerElement.classList.add(code + "-anchor-symbol-class");
    if (code === "LeftTop") {
      pointerElement.style.left = `calc(0px - ${pointerSize[0] / 2}px)`;
      pointerElement.style.top = `calc(0px - ${pointerSize[1] / 2}px)`;
    } else if (code === "LeftCenter") {
      pointerElement.style.left = `calc(0px - ${pointerSize[0] / 2}px)`;
      pointerElement.style.top = `calc(50% - ${pointerSize[1] / 2}px)`;
    } else if (code === "LeftBottom") {
      pointerElement.style.left = `calc(0px - ${pointerSize[0] / 2}px)`;
      pointerElement.style.top = `calc(100% - ${pointerSize[1] / 2}px)`;
    } else if (code === "CenterTop") {
      pointerElement.style.left = `calc(50% - ${pointerSize[0] / 2}px)`;
      pointerElement.style.top = `calc(0px - ${pointerSize[1] / 2}px)`;
    } else if (code === "CenterBottom") {
      pointerElement.style.left = `calc(50% - ${pointerSize[0] / 2}px)`;
      pointerElement.style.top = `calc(100% - ${pointerSize[1] / 2}px)`;
    } else if (code === "RightTop") {
      pointerElement.style.top = `calc(0px - ${pointerSize[1] / 2}px)`;
      pointerElement.style.left = `calc(100% - ${pointerSize[0] / 2}px)`;
    } else if (code === "RightCenter") {
      pointerElement.style.top = `calc(50% - ${pointerSize[1] / 2}px)`;
      pointerElement.style.left = `calc(100% - ${pointerSize[0] / 2}px)`;
    } else if (code === "RightBottom") {
      pointerElement.style.top = `calc(100% - ${pointerSize[1] / 2}px)`;
      pointerElement.style.left = `calc(100% - ${pointerSize[0] / 2}px)`;
    } else if (code === "RotatePoint") {
      pointerElement.style.top = "-10px";
      pointerElement.style.left = `calc(50% - ${pointerSize[0] / 2}px)`;
    }

    pointerMap[code] = pointerElement;
    node.appendChild(pointerElement);
  });

  return pointerMap;
};
