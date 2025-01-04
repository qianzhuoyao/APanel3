import {
  deEventQueue,
  enEventQueue,
  isEventQueueEmpty,
} from "../event/eventPriorityQueue";
import { ITask, PriorityQueue } from "../event/queue.type";

const createTask = (
  name: string,
  priority: number,
  execute: () => void
): ITask => ({
  name,
  priority,
  execute,
});

// 添加任务到优先队列
export const addEventTask = (
  taskName: string,
  priority: number,
  execute: () => void
): PriorityQueue<ITask> => {
  const task = createTask(taskName, priority, execute);
  return enEventQueue(task);
};

export const runEventTasks = (): void => {
  while (!isEventQueueEmpty()) {
    const [task] = deEventQueue();
    if (task) {
      console.log(`Running task: ${task.name} with priority: ${task.priority}`);
      task.execute();
    }
  }
};
