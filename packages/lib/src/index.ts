import * as Stream from "./stream";
import * as Permission from "./permission";
import * as Rxjs from "rxjs";
import * as Uuid from "uuid";
import dayjs from "dayjs";
import { List, Map, Set } from "immutable";
export type { Dayjs } from "dayjs";
export { createSingle } from "./single";
/**
 * 模块大驼峰
 * 函数 小坨风
 * 类型不动
 */
const Immutable = {
  List,
  Map,
  Set,
};

export { Stream, Permission, Immutable, Rxjs, Uuid, dayjs };
