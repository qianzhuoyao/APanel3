import { dayjs } from "@repo/lib";
import { _initWindowContext } from "../context";
import { IBroadcastBody } from "./broadcast.type";

export const sendBroadcastMessage = (
  broadcastMessage: Omit<IBroadcastBody, "time">
) => {
  _initWindowContext()
    .window.get("broadcast")
    ?.next({
      ...broadcastMessage,
      time: dayjs().unix(),
    });
};

export const subscribeBroadcastMessage = (
  subscribe: (message: IBroadcastBody) => void
) => {
  _initWindowContext().window.get("broadcast")?.subscribe(subscribe);
};
