import { IHandler } from "./handler.type";
import { permission, Rxjs, Uuid } from "@repo/lib";
import { CONSTANT } from "@repo/window";
import { createPointers } from "./pointer";
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
export const handler: IHandler = ({ node, initPermission }) => {
  const eventSubscriptionMap = {} as Record<string, Rxjs.Subscription>;

  //权限
  const nodePermission = permission.createPermission(
    initPermission ||
      CONSTANT.PERMISSION_HANDLER.DRAGGABLE |
        CONSTANT.PERMISSION_HANDLER.RESIZABLE |
        CONSTANT.PERMISSION_HANDLER.ROTATABLE
  );
  node.style.position = "relative";
  //给元素增加权限信息
  node.setAttribute(
    CONSTANT.PERMISSION_ATTRIBUTE.DATA_ELEMENT_ATTRIBUTE_KEY,
    nodePermission.getPermission().toString()
  );
  const groupId = Uuid.v4();
  //给元素增加分组信息
  node.setAttribute(CONSTANT.NODE.ROLE.GROUP_MASTER_KEY, groupId);
  //创建handler
  const handlerContainer = document.createElement("div");

  const pointer = createPointers(handlerContainer, groupId);

  node.appendChild(handlerContainer);

  const remove = () => {
    Object.keys(eventSubscriptionMap).forEach((eventName) => {
      eventSubscriptionMap[eventName].unsubscribe();
    });
    node.removeChild(handlerContainer);
  };

  const setSelected = (selected: boolean) => {
    if (!isRemoved()) {
      handlerContainer.style.display = selected ? "block" : "none";
      handlerContainer.style.border = "1px dashed";
      return 1;
    }
    throw new ReferenceError("当前handler已经被卸载无法操作");
  };

  const isRemoved = () => {
    return !node.contains(handlerContainer);
  };

  const addEventListener = (
    eventName: string,
    eventCallback: (evt: Event) => void
  ) => {
    eventSubscriptionMap[eventName] = Rxjs.fromEvent(node, eventName).subscribe(
      eventCallback
    );
  };

  const isSelected = () => {
    return !(handlerContainer.style.display === "none");
  };

  return {
    node,
    pointer,
    nodePermission,
    handlerContainer,
    remove,
    isRemoved,
    isSelected,
    setSelected,
    addEventListener,
  };
};
