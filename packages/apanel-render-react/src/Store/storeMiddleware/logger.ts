import { Middleware } from "../type";

export const logger: Middleware<any> = async (store, task, next) => {
  console.log(store, task, "solss");
  next();
};
