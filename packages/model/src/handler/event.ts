import { POINTER_POSITION_CODE } from "./pointer";
import { IType_of_POINTER_POSITION_CODE } from "./handler.type";
import { Rxjs } from "@repo/lib";
import { EVENT, NODE, NODE_HANDLER_ATTRIBUTE } from "./constant";

export const moveNode = (
  dom: HTMLElement,
  offset: number[],
  keys: string[]
) => {
  dom.setAttribute(keys[0], offset[0].toString());
  dom.setAttribute(keys[1], offset[1].toString());
  dom.style.transform = `translate(${offset[0]}px,${offset[1]}px)`;
};

export const createDragEvent = (dom: HTMLElement) => {
  const mouseDown$ = Rxjs.fromEvent<MouseEvent>(dom, "mousedown");
  const mouseUp$ = Rxjs.fromEvent<MouseEvent>(document.body, "mouseup");
  const mouseMove$ = Rxjs.fromEvent<MouseEvent>(document.body, "mousemove");

  const observable = mouseDown$.pipe(
    Rxjs.map((downEvent) => {
      return {
        initDomLeft:
          Number(dom.getAttribute(EVENT.ATTRIBUTE.ACT_POSITION_VALUE_LEFT)) ||
          0,
        initDOmTop:
          Number(dom.getAttribute(EVENT.ATTRIBUTE.ACT_POSITION_VALUE_TOP)) || 0,
        initMouseLeft: downEvent.clientX,
        initMouseTop: downEvent.clientY,
      };
    }),
    Rxjs.switchMap((across) =>
      mouseMove$.pipe(
        Rxjs.takeUntil(mouseUp$),
        Rxjs.map((moveEvent) => {
          const offsetLeft = moveEvent.clientX - across.initMouseLeft;
          const offsetTop = moveEvent.clientY - across.initMouseTop;
          moveNode(
            dom,
            [across.initDomLeft + offsetLeft, across.initDOmTop + offsetTop],
            [
              EVENT.ATTRIBUTE.ACT_POSITION_VALUE_LEFT,
              EVENT.ATTRIBUTE.ACT_POSITION_VALUE_TOP,
            ]
          );
        })
      )
    )
  );

  const subscription = observable.subscribe();

  return {
    observable,
    subscription,
  };
};

export const createResizeEvent = (anchorDom: HTMLElement) => {
  const mouseDown$ = Rxjs.fromEvent<MouseEvent>(anchorDom, "mousedown");
  const mouseUp$ = Rxjs.fromEvent<MouseEvent>(document.body, "mouseup");
  const mouseMove$ = Rxjs.fromEvent<MouseEvent>(document.body, "mousemove");

  const position = anchorDom.getAttribute(
    NODE_HANDLER_ATTRIBUTE.NODE_HANDLER_ATTRIBUTE_ROLE_KEY
  ) as IType_of_POINTER_POSITION_CODE;

  if (POINTER_POSITION_CODE.some((code) => code === position)) {
    const observable = mouseDown$.pipe(
      Rxjs.map((downEvent) => {
        const masterNode = document.querySelectorAll(`
          *[${NODE.ROLE.GROUP_MASTER_KEY}='${anchorDom.getAttribute(NODE.ROLE.GROUP_SOLVE_ANCHOR_KEY)}']
          `);

        if (masterNode?.length === 0) {
          throw new ReferenceError(
            "节点并未绑定成功,无法选中master节点尽心resize操作"
          );
        }

        downEvent.stopPropagation();

        return {
          masterNode,
          masterNodeOffsetLeft: masterNode?.[0]?.getAttribute(
            EVENT.ATTRIBUTE.ACT_POSITION_VALUE_LEFT
          ),
          masterNodeOffsetTop: masterNode?.[0]?.getAttribute(
            EVENT.ATTRIBUTE.ACT_POSITION_VALUE_TOP
          ),
          initMasterNodeWidth: masterNode[0].getBoundingClientRect().width,
          initMasterNodeHeight: masterNode[0].getBoundingClientRect().height,
          initMouseLeft: downEvent.clientX,
          initMouseTop: downEvent.clientY,
        };
      }),
      Rxjs.switchMap((across) =>
        mouseMove$.pipe(
          Rxjs.takeUntil(mouseUp$),
          Rxjs.map((moveEvent) => {
            const offsetLeft = moveEvent.clientX - across.initMouseLeft;
            const offsetTop = moveEvent.clientY - across.initMouseTop;
            const masterNodeOffsetLeft =
              Number(across.masterNodeOffsetLeft) || 0;
            const masterNodeOffsetTop = Number(across.masterNodeOffsetTop) || 0;

            across.masterNode.forEach((ele) => {
              if (ele instanceof HTMLElement) {
                switch (position) {
                  case "LeftTop":
                    moveNode(
                      ele,
                      [
                        masterNodeOffsetLeft + offsetLeft / 2,
                        masterNodeOffsetTop + offsetTop,
                      ],
                      [
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_LEFT,
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_TOP,
                      ]
                    );
                    ele.style.width =
                      across.initMasterNodeWidth - offsetLeft + "px";
                    ele.style.height =
                      across.initMasterNodeHeight - offsetTop + "px";
                    return 1;
                  case "LeftCenter":
                    moveNode(
                      ele,
                      [
                        masterNodeOffsetLeft + offsetLeft / 2,
                        masterNodeOffsetTop,
                      ],
                      [
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_LEFT,
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_TOP,
                      ]
                    );
                    ele.style.width =
                      across.initMasterNodeWidth - offsetLeft + "px";
                    return 1;
                  case "LeftBottom":
                    moveNode(
                      ele,
                      [
                        masterNodeOffsetLeft + offsetLeft / 2,
                        masterNodeOffsetTop,
                      ],
                      [
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_LEFT,
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_TOP,
                      ]
                    );
                    ele.style.width =
                      across.initMasterNodeWidth - offsetLeft + "px";
                    ele.style.height =
                      across.initMasterNodeHeight + offsetTop + "px";
                    return 1;
                  case "RightTop":
                    moveNode(
                      ele,
                      [
                        masterNodeOffsetLeft + offsetLeft / 2,
                        masterNodeOffsetTop + offsetTop,
                      ],
                      [
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_LEFT,
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_TOP,
                      ]
                    );
                    ele.style.width =
                      across.initMasterNodeWidth + offsetLeft + "px";
                    ele.style.height =
                      across.initMasterNodeHeight - offsetTop + "px";
                    return 1;
                  case "RightCenter":
                    moveNode(
                      ele,
                      [
                        masterNodeOffsetLeft + offsetLeft / 2,
                        masterNodeOffsetTop,
                      ],
                      [
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_LEFT,
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_TOP,
                      ]
                    );
                    ele.style.width =
                      across.initMasterNodeWidth + offsetLeft + "px";
                    return 1;
                  case "RightBottom":
                    moveNode(
                      ele,
                      [
                        masterNodeOffsetLeft + offsetLeft / 2,
                        masterNodeOffsetTop,
                      ],
                      [
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_LEFT,
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_TOP,
                      ]
                    );

                    ele.style.width =
                      across.initMasterNodeWidth + offsetLeft + "px";
                    ele.style.height =
                      across.initMasterNodeHeight + offsetTop + "px";
                    return 1;
                  case "CenterTop":
                    moveNode(
                      ele,
                      [masterNodeOffsetLeft, masterNodeOffsetTop + offsetTop],
                      [
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_LEFT,
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_TOP,
                      ]
                    );

                    ele.style.height =
                      across.initMasterNodeHeight - offsetTop + "px";
                    return 1;
                  case "CenterBottom":
                    moveNode(
                      ele,
                      [masterNodeOffsetLeft, masterNodeOffsetTop],
                      [
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_LEFT,
                        EVENT.ATTRIBUTE.ACT_POSITION_VALUE_TOP,
                      ]
                    );

                    ele.style.height =
                      across.initMasterNodeHeight + offsetTop + "px";
                    return 1;
                  default:
                    throw new ReferenceError("锚点不存在");
                }
              }
            });
          })
        )
      )
    );
    const subscription = observable.subscribe();
    return {
      observable,
      subscription,
    };
  }

  throw new TypeError("操作锚点不符合定位的约定,无法绑定事件");
};
//The incoming observable is always executed in the order of the index of the passed-in array.
export const composeEvent = <T>(observableList: Rxjs.Observable<T>[]) => {
  console.log(observableList, "observableList");
  const observable = Rxjs.concat(...observableList);
  const subscription = observable.subscribe();
  return { observable, subscription };
};
