import { getNodesByDepth } from "./getNodesByDepth";
import { INode } from "./type";
/**
 * 点击测试
 * 在检测用户点击了哪个图层时，可以从深度最大的图层开始遍历，如果点击位置在图层的范围内，则该图层被选中。
 * @param root 根节点
 * @param x 点击的x坐标
 * @param y 点击的y坐标
 * @returns 点击到的节点
 */
export const hitTest = (root: INode, x: number, y: number): INode | null => {
  const nodes = getNodesByDepth(root).reverse(); // 逆序，从最上层开始遍历
  for (const node of nodes) {
    if (
      x >= node.x &&
      x <= node.x + node.width &&
      y >= node.y &&
      y <= node.y + node.height
    ) {
      return node; // 点击在图层范围内
    }
  }
  return null; // 没有点击到任何图层
};
