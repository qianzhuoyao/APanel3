import { Permission } from "@repo/lib";
import { IBlock } from "./block.type";
import { BLOCK_PERMISSION } from "./constant";

/**
 * _struct
The purpose of the block 
is to map the DOM elements
on the window into a tree-like  
structure.Any user operations  
and changes will be synchronized 
to this structure. It will respond
to nodes on the window、that are 
bound by a handler, and the node’s redo/undo, 
selection state (the state of the handler) will all be mapped 
to the structure. Changes to this structure will also be synchronized
back to the DOM, such as modifying relationships, deleting, 
editing, or operations like adding or copying. You can even add special permissions to the nodes, 
such as prohibiting deletion or copying.
 */
export const createBlock: IBlock = ({
  groupId,
  handler,
  name,
  copyBy,
  interval,
  eventPriority,
}) => {
  if (!groupId) {
    throw new TypeError("groupId is undefined");
  }

  const blockPermission = Permission.createPermission(
    BLOCK_PERMISSION.CLONEABLE |
      BLOCK_PERMISSION.PLUGGABLE |
      BLOCK_PERMISSION.REMOVABLE
  );

  const _eventPriority = eventPriority || 1;

  return {
    name,
    groupId,
    handler,
    blockPermission,
    copyBy,
    interval,
    eventPriority: _eventPriority,
  };
};
