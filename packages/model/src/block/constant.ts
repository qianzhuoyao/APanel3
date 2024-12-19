export const BLOCK_PERMISSION = {
  //允许拷贝
  CLONEABLE: 0b1,
  //允许删除
  REMOVABLE: 0b10,
  //允许插入节点
  PLUGGABLE: 0b100,
} as const;

export const GRAPH_ROOT = "__ROOT__" as const;

export const _UNDEFINED_CONFIG_TYPE = "_UNDEFINED_CONFIG_TYPE";