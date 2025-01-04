import * as Immutable from "immutable";
import { PriorityQueue } from "./queue.type";

// 创建一个空的优先队列
const createPriorityQueue = <T>(): PriorityQueue<T> => Immutable.List<T>();

// 入队：将任务按照优先级由高到低排序插入队列
const enqueue = <T extends { priority: number }>(
  queue: PriorityQueue<T>,
  task: T
): PriorityQueue<T> => {
  const newQueue = queue.push(task).sortBy((t) => -t.priority);
  return newQueue;
};

// 出队：移除并返回优先级最高的任务
const dequeue = <T>(queue: PriorityQueue<T>): [T | null, PriorityQueue<T>] => {
  if (queue.isEmpty()) {
    return [null, queue];
  }

  const firstTask = queue.first()!;
  const newQueue = queue.shift();

  return [firstTask, newQueue];
};

// 检查队列是否为空
const isEmpty = <T>(queue: PriorityQueue<T>): boolean => queue.isEmpty();

export { isEmpty, enqueue, dequeue, createPriorityQueue };
