import { createSingle } from "@repo/lib";
import { IGraphNode } from "./block.type";

const _graph = createSingle(() => {
  const graph: Partial<Record<string, IGraphNode>> = {};
  return {
    graph,
  };
});

export const getBlockGraph = () => {
  return _graph().graph;
};

export const createRootBlockNode = (groupId: string) => {
  const blockNode = _graph().graph[groupId];
  if (!blockNode) {
    _graph().graph[groupId] = {
      childrenGroupId: [],
      parentGroupId: "__root__",
    };
  }
};
//插入节点
export const insertBlockGraph = (parentGroupId: string, groupId: string) => {
  const blockNode = _graph().graph[groupId];
  const parentBlockNode = _graph().graph[parentGroupId];
  if (blockNode) {
    appendBlockGraph(parentGroupId, groupId);
    return;
  }
  _graph().graph[groupId] = {
    childrenGroupId: [],
    parentGroupId: parentGroupId,
  };

  if (parentBlockNode) {
    parentBlockNode.childrenGroupId = [
      ...new Set(...parentBlockNode.childrenGroupId, groupId),
    ];
  } else {
    throw new ReferenceError("parentGroupId not defined");
  }
};

//变更节点
export const appendBlockGraph = (parentGroupId: string, groupId: string) => {
  const blockNode = _graph().graph[groupId];
  const parentBlockNode = _graph().graph[parentGroupId];
  if (blockNode) {
    blockNode.parentGroupId = parentGroupId;
    if (parentBlockNode) {
      parentBlockNode.childrenGroupId = [
        ...new Set(...parentBlockNode.childrenGroupId, groupId),
      ];
    } else {
      throw new ReferenceError("parentGroupId not defined");
    }
  } else {
    throw new ReferenceError("groupId not defined");
  }
};
