export const BLOCK_PERMISSION = {
  //允许拷贝
  CLONEABLE: 0b1,
  //允许删除
  REMOVABLE: 0b10,
  //允许插入节点
  PLUGGABLE: 0b100,
} as const;