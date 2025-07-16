import {
  fromEvent,
  map,
  switchMap,
  takeUntil,
  combineLatestWith,
  merge,
  of,
} from "rxjs";
import { EVENT_NAME } from "./constant";

interface IDrawerParams {
  target: HTMLDivElement | null;
}
type EventName = typeof EVENT_NAME;
type DragEvent = {
  down: MouseEvent;
  move?: MouseEvent;
  up?: MouseEvent;
  eventName: (typeof EVENT_NAME)[keyof typeof EVENT_NAME];
};

export const drag = ({ target }: IDrawerParams) => {
  console.log(target, "cse");
  if (target === null) {
    throw new ReferenceError("绘制的舞台dom不存在");
  }

  const mouseDown$ = fromEvent<MouseEvent>(target, "mousedown");
  const mousemove$ = fromEvent<MouseEvent>(document.body, "mousemove");
  const mouseup$ = fromEvent<MouseEvent>(document.body, "mouseup");

  return mouseDown$.pipe(
    switchMap((downEvent) => {
      const down: DragEvent = {
        down: downEvent,
        eventName: EVENT_NAME.MOUSE_DOWN,
      };

      const move$ = mousemove$.pipe(
        map(
          (moveEvent): DragEvent => ({
            down: downEvent,
            move: moveEvent,
            eventName: EVENT_NAME.MOUSE_MOVE,
          })
        )
      );

      const up$ = mouseup$.pipe(
        map(
          (upEvent): DragEvent => ({
            down: downEvent,
            up: upEvent,
            move: upEvent, // 可选是否填入
            eventName: EVENT_NAME.MOUSE_UP,
          })
        )
      );

      // merge 包括 down → 多个 move → up（最后）
      return merge(
        // 发出 down 一次
        of(down),
        move$.pipe(takeUntil(mouseup$)),
        up$
      );
    })
  );
};
