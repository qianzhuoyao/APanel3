import { createSingle, Immutable } from "@repo/lib";
import { IGraphNode } from "./block.type";
import { GRAPH_ROOT } from "./constant";

const _graph = createSingle(() => {
  const graph: Partial<Record<string, IGraphNode>> = {
    [GRAPH_ROOT]: {
      childrenGroupId: Immutable.Set<string>(),
      parentGroupId: null,
    },
  };
  return {
    graph,
  };
});

export const getBlockGraph = () => {
  return _graph().graph;
};

//插入节点
export const insertBlockGraph = (parentGroupId: string, groupId: string) => {
  if (!groupId) {
    throw new ReferenceError("groupId not defined");
  }

  const blockNode = _graph().graph[groupId];
  const parentBlockNode = _graph().graph[parentGroupId];
  if (blockNode) {
    appendBlockGraph(parentGroupId, groupId);
    return;
  }

  if (parentBlockNode) {
    _graph().graph[groupId] = {
      childrenGroupId: Immutable.Set<string>(),
      parentGroupId: parentGroupId,
    };
    parentBlockNode.childrenGroupId =
      parentBlockNode.childrenGroupId.add(groupId);
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
      parentBlockNode.childrenGroupId =
        parentBlockNode.childrenGroupId.add(groupId);
    } else {
      throw new ReferenceError("parentGroupId not defined");
    }
  } else {
    throw new ReferenceError("groupId not defined");
  }
};
