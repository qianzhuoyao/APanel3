import { IHandler } from "./handler.type";
import { permission } from "@repo/lib";
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
  //权限
  const nodePermission = permission.createPermission(
    initPermission ||
      CONSTANT.PERMISSION_HANDLER.DRAGGABLE |
        CONSTANT.PERMISSION_HANDLER.RESIZABLE |
        CONSTANT.PERMISSION_HANDLER.ROTATABLE
  );
  //给元素增加权限信息
  node.setAttribute(
    CONSTANT.PERMISSION_ATTRIBUTE.DATA_ELEMENT_ATTRIBUTE_KEY,
    nodePermission.getPermission().toString()
  );

  //创建handler
  const handlerContainer = document.createElement("div");

  handlerContainer.style.width = "100%";
  handlerContainer.style.height = "100%";

  handlerContainer.setAttribute(
    CONSTANT.NODE_HANDLER_ATTRIBUTE.NODE_HANDLER_ATTRIBUTE_CONTAINER,
    "1"
  );

  const pointer = createPointers(handlerContainer);

  node.appendChild(handlerContainer);

  return {
    node,
    pointer,
    nodePermission,
  };
};
