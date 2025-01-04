import { createSingle } from "@repo/lib";
import { IBlockParams, IModel } from "./block.type";
import { createBlock } from "./blockAttr";
import { createPermissionHandler } from "../handler";
import { createBlockConfig } from "./blockConfig";
import { createBlockSubscription } from "./blockSubscription";
import { createBlockEventTask } from "./blockEventTask";
import Immutable from "immutable";

const _modal = createSingle(() => {
  return {
    model: Immutable.Map<string, IModel>(),
  };
});

export const getModel = (): Immutable.Map<string, IModel> => {
  return _modal().model;
};

export const hasModel = (groupId: string) => {
  return _modal().model.has(groupId);
};

export const addModel = (
  dom: HTMLElement,
  params: Pick<IBlockParams, "name" | "groupId">
) => {
  const { handler } = createPermissionHandler({
    node: dom,
    selected: true,
    groupId: params.groupId,
  });
  //生成对应的键
  const config = createBlockConfig();
  const subscription = createBlockSubscription();
  const eventTask = createBlockEventTask();
  const block = createBlock({ ...params, handler });

  _modal().model = _modal().model.set(params.groupId, {
    block,
    config,
    subscription,
    eventTask,
  });

  return block;
};
