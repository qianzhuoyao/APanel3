import { BaseNode } from "./type";

export class NodeManager {
  private nodes: Map<string, BaseNode> = new Map();

  getNodes() {
    const result: BaseNode[] = [];
    this.nodes.forEach((value) => {
      result.push(value);
    });
    return result;
  }

  // 添加节点
  addNode(node: BaseNode, parentId?: string) {
    if (parentId) {
      const parent = this.nodes.get(parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(node.id);
        node.parent = parentId;
        node.zIndex = parent.children.length - 1; // 默认插入到最上层
      }
    }
    this.nodes.set(node.id, node);
  }

  // 获取节点
  getNode(id: string): BaseNode | undefined {
    return this.nodes.get(id);
  }

  // 获取子节点（按 zIndex 排序）
  getChildren(id: string): BaseNode[] {
    return (this.nodes.get(id)?.children || [])
      .map((childId) => this.nodes.get(childId)!)
      .sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));
  }

  // **更新节点**
  updateNode(id: string, updates: Partial<BaseNode>) {
    const node = this.nodes.get(id);
    if (node) {
      this.nodes.set(id, { ...node, ...updates });
    }
  }

  // **删除节点（递归删除子节点）**
  deleteNode(id: string) {
    const node = this.nodes.get(id);
    if (!node) return;

    if (node.children) {
      for (const childId of node.children) {
        this.deleteNode(childId);
      }
    }

    if (node.parent) {
      const parent = this.nodes.get(node.parent);
      if (parent && parent.children) {
        parent.children = parent.children.filter((childId) => childId !== id);
      }
    }

    this.nodes.delete(id);
  }

  // **调整层级顺序**
  private reorderSiblings(parentId: string) {
    const parent = this.nodes.get(parentId);
    if (!parent || !parent.children) return;

    parent.children
      .map((childId) => this.nodes.get(childId)!)
      .sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0))
      .forEach((node, index) => (node.zIndex = index));
  }

  // **设置节点顺序**
  setNodeOrder(id: string, newIndex: number) {
    const node = this.nodes.get(id);
    if (!node || !node.parent) return;

    const parent = this.nodes.get(node.parent);
    if (!parent || !parent.children) return;

    // 过滤出兄弟节点
    const siblings = parent.children.map((childId) => this.nodes.get(childId)!);

    // 限制 newIndex 不能越界
    newIndex = Math.max(0, Math.min(newIndex, siblings.length - 1));

    // 重新排序
    siblings.sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));
    siblings.splice(siblings.indexOf(node), 1); // 移除当前节点
    siblings.splice(newIndex, 0, node); // 插入新位置

    // 更新 zIndex
    siblings.forEach((n, i) => (n.zIndex = i));
  }

  // **向前移动一层**
  moveNodeForward(id: string) {
    const node = this.nodes.get(id);
    if (node?.parent) {
      this.setNodeOrder(id, (node.zIndex ?? 0) + 1);
    }
  }

  // **向后移动一层**
  moveNodeBackward(id: string) {
    const node = this.nodes.get(id);
    if (node?.parent) {
      this.setNodeOrder(id, (node.zIndex ?? 0) - 1);
    }
  }

  // **置顶**
  bringNodeToFront(id: string) {
    const node = this.nodes.get(id);
    if (node?.parent) {
      const parent = this.nodes.get(node.parent);
      if (parent?.children) {
        this.setNodeOrder(id, parent.children.length - 1);
      }
    }
  }

  // **置底**
  sendNodeToBack(id: string) {
    const node = this.nodes.get(id);
    if (node?.parent) {
      this.setNodeOrder(id, 0);
    }
  }
}
