export interface IBlock {
  startX: number;
  startY: number;
  width: number;
  height: number;
}
export interface ICustomBlockAttr {
  className: string;
  _style: CSSProperties;
  attr: Record<string, string>;
}
