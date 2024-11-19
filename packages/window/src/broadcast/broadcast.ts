import { Rxjs, dayjs } from "@repo/lib";
import { _initWindowContext } from "../context";
import { IBroadcastBody } from "./broadcast.type";

export const initBroadcast = () => {
  if (!_initWindowContext().window.broadcast) {
    _initWindowContext().window.broadcast = new Rxjs.Subject<IBroadcastBody>();
  }
};

initBroadcast();

export const sendBroadcastMessage = (
  broadcastMessage: Omit<IBroadcastBody, "time">
) => {
  _initWindowContext().window.broadcast?.next({
    ...broadcastMessage,
    time: dayjs().unix(),
  });
};

export const subscribeBroadcastMessage = (
  subscribe: (message: IBroadcastBody) => void
) => {
  _initWindowContext().window.broadcast?.subscribe(subscribe);
};
