export type IScheduleTask = {
    name: string;
    priority: number;
    execute: () => void;
  };
  