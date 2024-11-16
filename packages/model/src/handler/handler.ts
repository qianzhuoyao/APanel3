import { IHandler, IHandlerParams } from "./handler.type";
import { permission, Rxjs, Uuid } from "@repo/lib";

import { createPointers, POINTER_POSITION_CODE } from "./pointer";
import { createDragEvent, createResizeEvent } from "./event";
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
  _pointer,
}) => {
  if (!(node instanceof HTMLElement)) {
    throw new TypeError("node type not is HTMLElement");
  }
  if (typeof nodePermission !== "number") {
    throw new TypeError("nodePermission type not is number");
  }

  //给元素增加权限信息
  node.setAttribute(
    PERMISSION_ATTRIBUTE.DATA_ELEMENT_ATTRIBUTE_KEY,
    nodePermission.toString()
  );

  if (selected) {
    handlerContainer.style.display = selected ? "block" : "none";
    handlerContainer.style.border = "1px dashed";
  }

  node.style.position = "relative";

  //给元素增加分组信息
  node.setAttribute(NODE.ROLE.GROUP_MASTER_KEY, groupId);

  const pointer = _pointer || createPointers(handlerContainer, groupId);

  node.appendChild(handlerContainer);

  const remove = () => {
    Object.keys(eventSubscriptionMap).forEach((eventName) => {
      eventSubscriptionMap[eventName].unsubscribe();
    });
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
    });
  };

  const addEventListener = (
    eventName: string,
    eventCallback: (evt: Event) => void
  ) => {
    eventSubscriptionMap[eventName] = Rxjs.fromEvent(node, eventName).subscribe(
      eventCallback
    );
  };

  const getNodePermission = () => {
    return nodePermission;
  };

  //混入默认事件
  if (nodePermission & PERMISSION_HANDLER.DRAGGABLE) {
    eventSubscriptionMap._Drag = createDragEvent(node).subscription;
  }
  
  if (nodePermission & PERMISSION_HANDLER.RESIZABLE) {
    POINTER_POSITION_CODE.forEach((key) => {
      eventSubscriptionMap[`_Resize${key}`] = createResizeEvent(
        pointer[key]
      ).subscription;
    });
  }

  const setNodePermission = (nodePermission: number) => {
    return handler({
      node,
      selected,
      handlerContainer,
      nodePermission,
      eventSubscriptionMap,
      groupId,
      _pointer: pointer,
    });
  };

  const isSelected = () => {
    return !(handlerContainer.style.display === "none");
  };

  return {
    node,
    pointer,
    handlerContainer,
    remove,
    isSelected,
    setSelected,
    addEventListener,
    getNodePermission,
    setNodePermission,
  };
};

export const createHandler = ({
  selected,
  node,
  nodePermission,
}: Pick<IHandlerParams, "selected" | "node" | "nodePermission">) => {
  const groupId = Uuid.v4();
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
}: Pick<IHandlerParams, "selected" | "node">) => {
  const localNodePermission: ReturnType<typeof permission.createPermission> =
    permission.createPermission(
      PERMISSION_HANDLER.DRAGGABLE |
        PERMISSION_HANDLER.RESIZABLE |
        PERMISSION_HANDLER.ROTATABLE
    );
  const handler = createHandler({
    nodePermission: localNodePermission.getPermission(),
    node,
    selected,
  });

  return {
    handler,
  };
};
