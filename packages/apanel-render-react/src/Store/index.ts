import { NodeManager } from "@repo/model/NodeManager";
import { createSingle } from "../Libs/createSingle";
import { Store } from "./store";
import { logAndRetryMiddleware } from "./storeMiddleware/logAndRetryMiddleware";
import { logger } from "./storeMiddleware/logger";
import { rollbackMiddleware } from "./storeMiddleware/rollbackMiddleware";
import { BaseNode } from "@repo/model/NodeManager/type";

type IinitState = {
  nodes: BaseNode[];
  selected: BaseNode[];
};

const initState: IinitState = {
  nodes: [],
  selected: [],
};

export const getRenderStore = createSingle(() => {
  const workerScript = new URL(
    "../Worker/storeUpdate/worker.js",
    import.meta.url
  ).href;
  return {
    nodeManager: new NodeManager(),
    store: new Store<IinitState>(initState, workerScript, [
      rollbackMiddleware,
      logAndRetryMiddleware,
      logger,
    ]),
  };
});
