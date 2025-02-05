import { Middleware, Task } from "./type";
import { maxRetries, retryDelay } from "./config";
import { v4 } from "uuid";
import { cloneDeep } from "lodash";

export class Store<T extends Record<string, any>> {
  public state: T;
  private worker: Worker;
  private listeners: ((state: T) => void)[] = [];
  private priorityQueue: Task<T>[] = [];
  private processing = false;
  public history: T[] = [];
  private future: T[] = [];
  private inTransaction = false;
  private transactionQueue: Task<T>[] = [];
  private channel: BroadcastChannel;
  private middlewares: Middleware<T>[] = [];

  constructor(
    models: T,
    workerScript: string,
    middlewares: Middleware<T>[] = []
  ) {
    this.state = models;
    this.worker = new Worker(workerScript, {
      type: "module",
    });
    this.channel = new BroadcastChannel("state-sync");
    this.middlewares = middlewares;
    this.worker.onmessage = (event) => {
      console.log(event, "results");
      const { results } = event.data;
      results.forEach(
        ({ model, newState }: { model: keyof T; newState: any }) => {
          console.log(this.state, model, newState, "this.state");
          this.state[model] = newState[model];
        }
      );
      this.notify();
      this.processing = false;
      this.processQueue();
    };

    this.channel.onmessage = (event) => {
      if (event.data && event.data.type === "syncState") {
        this.state = event.data.state;
        this.notify();
      }
    };
  }

  public use(middleware: Middleware<T>) {
    this.middlewares.push(middleware);
  }

  private async runMiddlewares(
    task: Task<T>,
    next: () => void | Promise<void>
  ) {
    let index = 0;
    const nextMiddleware = async () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        try {
          await middleware(this, task, nextMiddleware);
        } catch (error) {
          console.error("中间件错误:", error);
          next();
        }
      } else {
        next();
      }
    };
    await nextMiddleware();
  }

  public commit<K extends keyof T>(
    model: K,
    mutationName: string,
    payload: any,
    priority = 0,
    delay: number = 0,
    _maxRetries: number = maxRetries,
    _retryDelay: number = retryDelay
  ) {
    if (!(model in this.state)) {
      console.error(`❌ Model "${model.toString()}" 不存在`);
      return;
    }

    try {
      const task: Task<T> = {
        id: v4(),
        priority,
        model,
        mutationName,
        payload,
        prevState: this.state[model],
        delay,
        maxRetries: _maxRetries,
        retryDelay: _retryDelay,
      };
      this.history.push(cloneDeep(this.state));
      console.log(task, "tasks");
      this.runMiddlewares(task, async () => {
        if (task.delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, task.delay));
        }

        if (this.inTransaction) {
          this.transactionQueue.push(task);
        } else {
          this.priorityQueue.push(task);
          this.priorityQueue.sort((a, b) => b.priority - a.priority);
          this.processQueue();
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  public openTransaction() {
    this.inTransaction = true;
  }
  public closeTransaction() {
    this.inTransaction = false;
  }

  public commitTransaction() {
    this.inTransaction = false;
    const tasks = this.transactionQueue;
    this.transactionQueue = [];

    this.worker.postMessage({
      type: "batchCommit",
      tasks,
    });
  }

  // 启动 Undo 操作
  public undo() {
    if (this.history.length === 0) {
      console.error("❌ No more actions to undo");
      return;
    }
    try {
      const lastState = this.history.pop()!;
      console.log(this.state, "diss");
      this.future.push(cloneDeep(this.state)); // 把当前状态放到 redo 栈
      this.state = lastState; // 恢复上一个状态
      this.notify();
    } catch (error) {
      console.error(error);
    }
  }

  // 启动 Redo 操作
  public redo() {
    if (this.future.length === 0) {
      console.error("❌ No more actions to redo");
      return;
    }

    const nextState = this.future.pop()!;
    this.history.push(this.state); // 把当前状态放到 undo 栈
    this.state = nextState; // 恢复下一个状态
    this.notify();
  }

  private processQueue() {
    if (this.processing || this.priorityQueue.length === 0) {
      return;
    }

    this.processing = true;
    const batchSize = Math.min(5, this.priorityQueue.length);
    const tasks = this.priorityQueue.splice(0, batchSize);
    console.log(
      this.processing,
      this.priorityQueue.length,
      this.worker,
      tasks,
      "psq"
    );
    this.worker.postMessage({
      type: "batchCommit",
      tasks,
    });
  }

  public subscribe(listener: (state: T) => void) {
    this.listeners.push(listener);
  }
  public unSubscribe() {
    this.listeners = [];
  }

  public notify() {
    this.listeners.forEach((listener) => listener(this.state));

    this.channel.postMessage({
      type: "syncState",
      state: this.state,
    });
  }

  public closeChannel() {
    this.channel.close();
  }
}
