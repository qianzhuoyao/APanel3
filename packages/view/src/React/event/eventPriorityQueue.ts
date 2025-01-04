import { createSingle } from "@repo/lib";
import {
  createPriorityQueue,
  dequeue,
  enqueue,
  isEmpty,
} from "./priorityQueue";
import { ITask } from "./queue.type";

const _priorityEventQueue = createSingle(() => {
  return {
    eventQueue: createPriorityQueue<ITask>(),
  };
});

export const isEventQueueEmpty = () => {
  return isEmpty(_priorityEventQueue().eventQueue);
};

export const enEventQueue = (task: ITask) => {
  const queue = enqueue(_priorityEventQueue().eventQueue, task);
  _priorityEventQueue().eventQueue = queue;
  return queue;
};

export const deEventQueue = () => {
  const queue = dequeue(_priorityEventQueue().eventQueue);
  _priorityEventQueue().eventQueue = queue[1];
  return queue;
};
