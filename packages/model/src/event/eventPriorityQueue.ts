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
  return enqueue(_priorityEventQueue().eventQueue, task);
};

export const deEventQueue = () => {
  return dequeue(_priorityEventQueue().eventQueue);
};
