import { Rxjs } from "@repo/lib";
import { IBroadcastBody } from "../broadcast/broadcast.type";



export interface IWindowContext {
  broadcast: Rxjs.Subject<IBroadcastBody>;
}
