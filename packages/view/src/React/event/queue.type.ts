export type ITask = {
  name: string;
  priority: number;
  execute: (p?: unknown) => unknown;
};

// 使用 Immutable List 作为优先队列
export type PriorityQueue<T> = Immutable.List<T>;

export type IEventQueueTask = () => void;
