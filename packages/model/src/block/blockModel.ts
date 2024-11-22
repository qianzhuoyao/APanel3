import { createSingle, Immutable } from "@repo/lib";
import { IBlockParams, IModel } from "./block.type";
import { createBlock } from "./blockAttr";
import { createPermissionHandler } from "../handler";

const _modal = createSingle(() => {
  return {
    model: Immutable.Map<string, IModel>(),
  };
});

export const getModel = () => {
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
  const block = createBlock({ ...params, handler });

  _modal().model = _modal().model.set(params.groupId, {
    block,
  });

  return block;
};