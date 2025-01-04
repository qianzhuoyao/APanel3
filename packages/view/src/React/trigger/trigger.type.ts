import { ITask } from "../event/queue.type";

export interface ITaskStruct {
  executeCondition: string;
  executeName: string;
  runTimes: number;
  repeatTime: number;
}

export type IBlockTrigger = Pick<
  ITaskStruct,
  "executeCondition" | "executeName"
> &
  Pick<ITask, "priority" | "name">;

export type IBlockTriggerSubscription = Record<string, IBlockTrigger[]>;

export interface IEventTask {
  eventName: string;
  isCatch: boolean;
  executeCondition: string;
  send: Pick<ITaskStruct, "runTimes" | "repeatTime" | "executeName">[][];
  call: Pick<ITaskStruct, "runTimes" | "executeName">[][];
}

export type executeName = string;

export type IITriggerFunctionMap = Record<
  executeName,
  (params: unknown) => unknown
>;
