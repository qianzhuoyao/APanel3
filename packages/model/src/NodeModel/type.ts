/**
type：效果的类型，例如 DROP_SHADOW（外阴影）、INNER_SHADOW（内阴影）、LAYER_BLUR（图层模糊）、BACKGROUND_BLUR（背景模糊）。
color：效果的颜色。
offset：阴影的偏移量，包含 x 和 y 属性。
radius：模糊的半径或阴影的模糊程度。
spread：阴影的扩展程度。
blendMode: 混合模式，决定了效果如何与下方的图层混合。
visible: 控制效果的显示与隐藏
 */
export interface IEffect {
  type: "DROP_SHADOW" | "INNER_SHADOW" | "LAYER_BLUR" | "BACKGROUND_BLUR"; // 效果类型
  color: string; // 颜色 (例如: '#RRGGBB', 'rgba(r, g, b, a)')
  offset?: { x: number; y: number }; // 偏移量 (对于阴影)
  radius: number; // 半径 (模糊半径或阴影的模糊程度)
  spread?: number; // 扩展 (阴影的扩展程度)
  blendMode?: BlendMode; // 混合模式
  visible: boolean; // 是否可见
}
/**
基本混合模式：

NORMAL（正常）： 这是默认的混合模式。上层图层完全覆盖下层图层，没有任何混合效果。
变暗混合模式组：

这些模式通常会使图像变暗。

DARKEN（变暗）： 比较上下层图层的每个颜色通道（红、绿、蓝），并选择较暗的颜色。
MULTIPLY（正片叠底）： 将上下层图层的每个颜色通道的值相乘，然后除以 255（或 1，如果颜色值在 0 到 1 之间）。结果总是比任何一个原始颜色更暗。黑色乘以任何颜色都得到黑色，白色乘以任何颜色都保持不变。
COLOR_BURN（颜色加深）： 加深下层图层的颜色，以反映上层图层的颜色。增加对比度，并使中间调更暗。
变亮混合模式组：

这些模式通常会使图像变亮。

LIGHTEN（变亮）： 比较上下层图层的每个颜色通道，并选择较亮的颜色。
SCREEN（滤色）： 将上下层图层的每个颜色通道的值反相后相乘，然后再反相。结果总是比任何一个原始颜色更亮。黑色滤色任何颜色都保持不变，白色滤色任何颜色都得到白色。
COLOR_DODGE（颜色减淡）： 减淡下层图层的颜色，以反映上层图层的颜色。减少对比度，并使中间调更亮。
对比混合模式组：

这些模式通常会增加对比度。

OVERLAY（叠加）： 根据下层图层的颜色，进行正片叠底或滤色。如果下层图层较暗，则效果类似于正片叠底；如果下层图层较亮，则效果类似于滤色。
SOFT_LIGHT（柔光）： 使图像变暗或变亮，具体取决于上层图层的颜色。效果比叠加更柔和。
HARD_LIGHT（强光）： 使图像变暗或变亮，具体取决于上层图层的颜色。效果比柔光更强烈，类似于叠加但对比度更高。
差值混合模式组：

这些模式通常会产生特殊的效果。

DIFFERENCE（差值）： 计算上下层图层的每个颜色通道的差值（绝对值）。黑色与任何颜色混合都不会有变化，白色与任何颜色混合都会产生反相效果。
EXCLUSION（排除）： 类似于差值，但对比度较低。
HSL 混合模式组：

这些模式会影响颜色的色相、饱和度和明度。

HUE（色相）： 使用上层图层的色相，保留下层图层的饱和度和明度。
SATURATION（饱和度）： 使用上层图层的饱和度，保留下层图层的色相和明度。
COLOR（颜色）： 使用上层图层的色相和饱和度，保留下层图层的明度。
LUMINOSITY（明度）： 使用上层图层的明度，保留下层图层的色相和饱和度。
 */
// 混合模式枚举
enum BlendMode {
  NORMAL = "NORMAL",
  DARKEN = "DARKEN",
  MULTIPLY = "MULTIPLY",
  COLOR_BURN = "COLOR_BURN",
  LIGHTEN = "LIGHTEN",
  SCREEN = "SCREEN",
  COLOR_DODGE = "COLOR_DODGE",
  OVERLAY = "OVERLAY",
  SOFT_LIGHT = "SOFT_LIGHT",
  HARD_LIGHT = "HARD_LIGHT",
  DIFFERENCE = "DIFFERENCE",
  EXCLUSION = "EXCLUSION",
  HUE = "HUE",
  SATURATION = "SATURATION",
  COLOR = "COLOR",
  LUMINOSITY = "LUMINOSITY",
}
/**
 transition：页面或图层之间的过渡效果。
trigger：触发交互的方式，例如点击、悬停等。
destinationId：目标页面或图层的 ID。
animationType：动画类型。
duration：动画持续时间。
easing：缓动函数，控制动画的速率变化。
 */
export interface IPrototypeData {
  transition?: Transition; // 过渡效果
  trigger: Trigger; // 触发方式
  destinationId?: string; // 目标页面或图层的 ID
  animationType?: AnimationType; // 动画类型
  duration?: number; // 动画持续时间
  easing?: Easing; // 缓动函数
}

// 过渡效果枚举
enum Transition {
  INSTANT = "INSTANT",
  DISSOLVE = "DISSOLVE",
  SMART_ANIMATE = "SMART_ANIMATE",
  MOVE_IN = "MOVE_IN",
  MOVE_OUT = "MOVE_OUT",
  PUSH = "PUSH",
}

// 触发方式枚举
enum Trigger {
  ON_CLICK = "ON_CLICK",
  ON_HOVER = "ON_HOVER",
  ON_PRESS = "ON_PRESS",
  ON_DRAG = "ON_DRAG",
  AFTER_DELAY = "AFTER_DELAY",
}

// 动画类型枚举
enum AnimationType {
  INSTANT = "INSTANT",
  LINEAR = "LINEAR",
  EASE_IN = "EASE_IN",
  EASE_OUT = "EASE_OUT",
  EASE_IN_OUT = "EASE_IN_OUT",
}

// 缓动函数枚举
enum Easing {
  LINEAR = "LINEAR",
  EASE_IN = "EASE_IN",
  EASE_OUT = "EASE_OUT",
  EASE_IN_OUT = "EASE_IN_OUT",
  EASE_IN_BACK = "EASE_IN_BACK",
  EASE_OUT_BACK = "EASE_OUT_BACK",
  EASE_IN_OUT_BACK = "EASE_IN_OUT_BACK",
}

/**
horizontal：水平方向的约束：
LEFT：左对齐。
RIGHT：右对齐。
CENTER：水平居中。
LEFT_RIGHT：左右拉伸。
SCALE：等比例缩放。
vertical：垂直方向的约束：
TOP：顶对齐。
BOTTOM：底对齐。
CENTER：垂直居中。
TOP_BOTTOM：上下拉伸。
SCALE：等比例缩放。
 */
export interface IConstraints {
  horizontal: "LEFT" | "RIGHT" | "CENTER" | "LEFT_RIGHT" | "SCALE";
  vertical: "TOP" | "BOTTOM" | "CENTER" | "TOP_BOTTOM" | "SCALE";
}
/**
 * id：唯一标识符。
type：节点类型（例如 FRAME、RECTANGLE、TEXT）。
name：节点名称。
x、y：相对于父节点的坐标。
width、height：宽度和高度。
fill、stroke,strokeWidth,strokeRadius：填充和描边样式。
children：子节点数组
depth：深度
parent：父节点引用。
constraints：约束属性，用于自动布局。
effects：阴影、模糊等效果。
prototypeData：原型交互数据。
componentId：如果是一个组件实例，则指向组件的 ID。
 */
export interface INode {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  strokeType?: string;
  strokeRadius?: string;
  children?: INode[];
  parent?: INode;
  depth: number;
  constraints?: IConstraints;
  effects?: IEffect[];
  prototypeData?: IPrototypeData;
  componentId?: string;
}
