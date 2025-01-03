import type {
  IHandler,
  IHandlerDragEventStage,
  IHandlerParams,
  IHandlerResizeEventStage,
  IHandlerResult,
  IType_of_POINTER_POSITION_CODE,
} from "./handler.type";
import { Permission, Rxjs, Uuid } from "@repo/lib";

import { createPointers, POINTER_POSITION_CODE } from "./pointer";
import {
  createDragEvent,
  createResizeEvent,
  recordPosition,
  recordSize,
} from "./event";
import { NODE, PERMISSION_ATTRIBUTE, PERMISSION_HANDLER } from "./constant.ts";

/**
 *
 * This function adds control handles to the specified DOM
 * element and returns a new object containing the new DOM
 * elements and new event listeners. Based on the provided
 * permissions, it allows the element to be resized, moved,
 * and rotated. The event listeners capture mutation information.
 *
 * @param param0
 */

export const handler: IHandler = ({
  node,
  handlerContainer,
  selected,
  nodePermission,
  eventSubscriptionMap,
  groupId,
  dragFinish,
  dragRunning,
  dragStart,
  resizeFinish,
  resizeRunning,
  resizeStart,
  _pointer,
}) => {
  if (!(node instanceof HTMLElement)) {
    throw new TypeError("node type not is HTMLElement");
  }
  if (typeof nodePermission !== "number") {
    throw new TypeError("nodePermission type not is number");
  }

  const handlerId = Uuid.v4();

  const clearEvent = () => {
    console.log(handlerId, "handlerId-3");
    Object.keys(eventSubscriptionMap).forEach((eventName) => {
      eventSubscriptionMap[eventName]?.unsubscribe();
    });
  };

  //给元素增加权限信息
  node.setAttribute(
    PERMISSION_ATTRIBUTE.DATA_ELEMENT_ATTRIBUTE_KEY,
    nodePermission.toString()
  );

  node.style.position = "absolute";

  //给元素增加分组信息
  node.setAttribute(NODE.ROLE.GROUP_MASTER_KEY, groupId);

  const pointer = _pointer || createPointers(handlerContainer, groupId);

  node.appendChild(handlerContainer);

  handlerContainer.style.display = selected ? "block" : "none";
  handlerContainer.style.border = selected ? "1px dashed" : "none";
  recordPosition(node);
  recordSize(node);

  const remove = () => {
    clearEvent();
    handlerContainer.remove();
    return null;
  };

  const setSelected = (selected: boolean) => {
    return handler({
      node,
      selected,
      handlerContainer,
      nodePermission,
      eventSubscriptionMap,
      groupId,
      _pointer: pointer,
      dragFinish,
      dragRunning,
      dragStart,
      resizeFinish,
      resizeRunning,
      resizeStart,
    });
  };

  const addResizeEventListener: (
    eventName: keyof IHandlerResizeEventStage,
    cb: (e: MouseEvent, anchor: IType_of_POINTER_POSITION_CODE) => void
  ) => IHandlerResult = (eventName, cb) => {
    return handler({
      node,
      selected,
      handlerContainer,
      nodePermission,
      eventSubscriptionMap,
      groupId,
      _pointer: pointer,
      dragFinish,
      dragRunning,
      dragStart,
      resizeFinish,
      resizeRunning,
      resizeStart,
      [eventName]: cb,
    });
  };

  const addDragEventListener: (
    eventName: keyof IHandlerDragEventStage,
    cb: (e: MouseEvent) => void
  ) => IHandlerResult = (eventName, cb) => {
    return handler({
      node,
      selected,
      handlerContainer,
      nodePermission,
      eventSubscriptionMap,
      groupId,
      _pointer: pointer,
      dragFinish,
      dragRunning,
      dragStart,
      resizeFinish,
      resizeRunning,
      resizeStart,
      [eventName]: cb,
    });
  };
  console.log(eventSubscriptionMap, "eventSubscriptionMap");
  const addEventListener = (
    eventName: string,
    eventCallback: (evt: Event) => void
  ) => {
    console.log(handlerId, "handlerId-0");
    eventSubscriptionMap[eventName] = Rxjs.fromEvent(node, eventName).subscribe(
      eventCallback
    );
    return handler({
      node,
      selected,
      handlerContainer,
      nodePermission,
      eventSubscriptionMap,
      groupId,
      _pointer: pointer,
      dragFinish,
      dragRunning,
      dragStart,
      resizeFinish,
      resizeRunning,
      resizeStart,
    });
  };

  const getNodePermission = () => {
    return nodePermission;
  };

  //混入默认事件
  if (nodePermission & PERMISSION_HANDLER.DRAGGABLE) {
    eventSubscriptionMap._Drag = createDragEvent(node, {
      dragFinish,
      dragRunning,
      dragStart,
    }).subscription;
  }

  if (nodePermission & PERMISSION_HANDLER.RESIZABLE) {
    POINTER_POSITION_CODE.forEach((key) => {
      eventSubscriptionMap[`_Resize${key}`] = createResizeEvent(pointer[key], {
        resizeFinish,
        resizeRunning,
        resizeStart,
      }).subscription;
    });
  }

  console.log(
    handlerId,
    eventSubscriptionMap,
    nodePermission,
    nodePermission & PERMISSION_HANDLER.DRAGGABLE,
    "eventSubscriptionMap"
  );
  const setNodePermission = (
    permission: (nodePermission: number) => number
  ) => {
    return handler({
      node,
      selected,
      handlerContainer,
      nodePermission: permission(nodePermission),
      eventSubscriptionMap,
      groupId,
      dragFinish,
      dragRunning,
      dragStart,
      resizeFinish,
      resizeRunning,
      resizeStart,
      _pointer: pointer,
    });
  };

  const isSelected = () => {
    return !(handlerContainer.style.display === "none");
  };

  return {
    handlerId,
    node,
    pointer,
    handlerContainer,
    remove,
    isSelected,
    setSelected,
    addEventListener,
    getNodePermission,
    setNodePermission,
    addDragEventListener,
    addResizeEventListener,
  };
};

export const createHandler = ({
  selected,
  node,
  nodePermission,
  groupId,
}: Pick<
  IHandlerParams,
  "selected" | "node" | "nodePermission" | "groupId"
>) => {
  const handlerContainer = document.createElement("div");

  return handler({
    groupId,
    nodePermission,
    handlerContainer,
    node,
    selected,
    eventSubscriptionMap: {},
  });
};
//创建一个包含基本事件权限的handler
export const createPermissionHandler = ({
  selected,
  node,
  groupId,
}: Pick<IHandlerParams, "selected" | "node"> & { groupId?: string }) => {
  const _groupId = groupId || Uuid.v4();
  const localNodePermission: ReturnType<typeof Permission.createPermission> =
    Permission.createPermission(
      PERMISSION_HANDLER.DRAGGABLE |
        PERMISSION_HANDLER.RESIZABLE |
        PERMISSION_HANDLER.ROTATABLE
    );
  const handler = createHandler({
    nodePermission: localNodePermission.getPermission(),
    node,
    groupId: _groupId,
    selected,
  });

  return {
    handler,
  };
};
