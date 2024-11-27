import { IBlockTrigger } from "../trigger/trigger.type";
import { IBlockSubscriptionBuilder } from "./block.type";
import { Immutable } from "@repo/lib";
//方便追踪变更才放在一起
export const createBlockSubscription: IBlockSubscriptionBuilder = () => {
  let subscriptionMap = Immutable.Map<string, IBlockTrigger>();
  return {
    getSubscriptionMap: () => subscriptionMap,
    setSubscriptionMap: (
      changeFunc: (
        map: Immutable.Map<string, IBlockTrigger>
      ) => Immutable.Map<string, IBlockTrigger>
    ) => {
      subscriptionMap = changeFunc(subscriptionMap);
    },
  };
};
