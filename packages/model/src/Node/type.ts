// 2D 坐标
export type Vec2D = { x: number; y: number };

// 通用的节点基础属性
export interface BaseNode {
  id: string;
  type: string;
  position: Vec2D;
  zIndex:number;
  size: { width: number; height: number };
  rotation?: number; // 旋转角度
  visible?: boolean;
  locked?: boolean; // 是否锁定
  parent?: string | null; // 父节点 ID（null 代表根节点）
  children?: string[]; // 子节点 ID 列表
}

// 形状节点（矩形、椭圆、多边形）
export interface ShapeNode extends BaseNode {
  type: "shape";
  shapeType: "rectangle" | "ellipse" | "polygon";
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  cornerRadius?: number; // 矩形的圆角
}

// 文本节点
export interface TextNode extends BaseNode {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
}

// 图片节点
export interface ImageNode extends BaseNode {
  type: "image";
  src: string;
}

// 组节点（可以包含多个子节点）
export interface GroupNode extends BaseNode {
  type: "group";
}

// 画布节点（所有元素的根节点）
export interface CanvasNode extends BaseNode {
  type: "canvas";
  backgroundColor?: string;
}
// 可拖拽
export interface Draggable {
  draggable: boolean;
}

// 可缩放
export interface Scalable {
  scalable: boolean;
}

// 可旋转
export interface Rotatable {
  rotatable: boolean;
}

// 可选中
export interface Selectable {
  selected: boolean;
}

// 交互型节点
export interface InteractiveNode
  extends BaseNode,
    Draggable,
    Scalable,
    Rotatable,
    Selectable {}
