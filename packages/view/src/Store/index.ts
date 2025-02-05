import { createSingle } from "../Libs/createSingle";
import { Store } from "./store";
import { logAndRetryMiddleware } from "./storeMiddleware/logAndRetryMiddleware";
import { logger } from "./storeMiddleware/logger";
import { rollbackMiddleware } from "./storeMiddleware/rollbackMiddleware";
import { INode } from "@repo/model/NodeModel/type";

const initState: {
  nodes: INode[];
} = {
  nodes: [],
};

export const getRenderStore = createSingle(() => {
  const workerScript = new URL(
    "../Worker/storeUpdate/worker.js",
    import.meta.url
  ).href;
  return {
    store: new Store<{
      nodes: INode[];
    }>(initState, workerScript, [
      rollbackMiddleware,
      logAndRetryMiddleware,
      logger,
    ]),
  };
});
