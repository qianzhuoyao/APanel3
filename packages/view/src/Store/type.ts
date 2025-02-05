import { Store } from "./store";

export type Task<T> = {
  id:string
  priority: number;
  model: keyof T;
  mutationName: string;
  payload: any;
  prevState: any;
  delay: number;
  maxRetries?: number;
  retryDelay?: number;
};

export type Middleware<T extends Record<string, any>> = (
  store: Store<T>,
  task: Task<T>,
  next: () => void | Promise<void>
) => void;
