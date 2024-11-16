import { IHandler, IHandlerParams } from "./handler.type";
import { permission, Rxjs, Uuid } from "@repo/lib";
import { CONSTANT } from "@repo/window";
import { createPointers, POINTER_POSITION_CODE } from "./pointer";
import { createDragEvent, createResizeEvent } from "./event";

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
}) => {
  //给元素增加权限信息
  node.setAttribute(
    CONSTANT.PERMISSION_ATTRIBUTE.DATA_ELEMENT_ATTRIBUTE_KEY,
    nodePermission.toString()
  );

  if (selected) {
    handlerContainer.style.display = selected ? "block" : "none";
    handlerContainer.style.border = "1px dashed";
  }

  node.style.position = "relative";

  //给元素增加分组信息
  node.setAttribute(CONSTANT.NODE.ROLE.GROUP_MASTER_KEY, groupId);

  const pointer = createPointers(handlerContainer, groupId);

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
  if (nodePermission & CONSTANT.PERMISSION_HANDLER.DRAGGABLE) {
    eventSubscriptionMap._Drag = createDragEvent(node).subscription;
  }
  if (nodePermission & CONSTANT.PERMISSION_HANDLER.RESIZABLE) {
    POINTER_POSITION_CODE.forEach((key) => {
      eventSubscriptionMap[`_Resize${key}`] = createResizeEvent(
        pointer[key]
      ).subscription;
    });
  }
  console.log(
    nodePermission & CONSTANT.PERMISSION_HANDLER.RESIZABLE,
    eventSubscriptionMap,
    "sggg"
  );
  const setNodePermission = (nodePermission: number) => {
    return handler({
      node,
      selected,
      handlerContainer,
      nodePermission,
      eventSubscriptionMap,
      groupId,
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
export const createDefaultPermissionHandler = ({
  selected,
  node,
}: Pick<IHandlerParams, "selected" | "node">) => {
  const localNodePermission: ReturnType<typeof permission.createPermission> =
    permission.createPermission(
      CONSTANT.PERMISSION_HANDLER.DRAGGABLE |
        CONSTANT.PERMISSION_HANDLER.RESIZABLE |
        CONSTANT.PERMISSION_HANDLER.ROTATABLE
    );
  return {
    localNodePermission,
    handler: createHandler({
      nodePermission: localNodePermission.getPermission(),
      node,
      selected,
    }),
  };
};
