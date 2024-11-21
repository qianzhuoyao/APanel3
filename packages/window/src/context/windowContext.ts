import { createSingle, Immutable, Rxjs } from "@repo/lib";
import { IBroadcastBody } from "../broadcast/broadcast.type";

const windowContext = () => {
  return createSingle(() => {
    const window = Immutable.Map({
      broadcast: new Rxjs.Subject<IBroadcastBody>(),
    });
    return {
      window,
    };
  });
};

export const _initWindowContext = windowContext();
