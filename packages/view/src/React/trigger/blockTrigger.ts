import { createSingle } from "@repo/lib";
import Immutable from "immutable";
import { ITask } from "../event/queue.type";
import {
  createPriorityQueue,
  dequeue,
  enqueue,
  isEmpty,
} from "../event/priorityQueue";
import { queryFunction } from "./functions";

const _blockSubscription = createSingle(() => {
  return {
    //优先任务队列
    subscriptionMapPriorityQueue: Immutable.Map<
      string,
      ReturnType<typeof createPriorityQueue<ITask>>
    >(),
  };
});

const toSubscriptionJSON = () => {
  return _blockSubscription().subscriptionMapPriorityQueue.toJSON();
};

const queryQueue = (name: string) => {
  return _blockSubscription().subscriptionMapPriorityQueue.get(name);
};

export const isSubscriptionMapPriorityQueueEmpty = (name: string) => {
  const queue = queryQueue(name);

  if (!queue) {
    return true;
  }

  return isEmpty(queue);
};

export const enSubscriptionQueue = (
  name: string,
  priority: number,
  executeName: string
) => {
  if (!_blockSubscription().subscriptionMapPriorityQueue.has(name)) {
    _blockSubscription().subscriptionMapPriorityQueue =
      _blockSubscription().subscriptionMapPriorityQueue.set(
        name,
        createPriorityQueue<ITask>()
      );
  }

  const subscriptionQueue = queryQueue(name);
  if (!subscriptionQueue) {
    throw new TypeError("enSubscriptionQueue error its not defined");
  }

  const task = queryFunction(executeName);

  const queue = enqueue(subscriptionQueue, {
    name: executeName,
    priority,
    execute: task,
  });
  _blockSubscription().subscriptionMapPriorityQueue =
    _blockSubscription().subscriptionMapPriorityQueue.set(name, queue);
  return queue;
};

export const deSubscriptionQueue = (name: string) => {
  const subscriptionQueue = queryQueue(name);
  if (!subscriptionQueue) {
    throw new TypeError("deSubscriptionQueue error its not defined");
  }
  const queue = dequeue(subscriptionQueue);
  _blockSubscription().subscriptionMapPriorityQueue =
    _blockSubscription().subscriptionMapPriorityQueue.set(name, queue[1]);
  return queue;
};
