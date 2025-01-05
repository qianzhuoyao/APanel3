import { fromEvent, Subject } from "rxjs";

const createSingle = <C>(initializer: () => C): (() => C) => {
  let instance: C | null = null;
  return () => {
    if (instance === null) {
      instance = initializer();
    }
    return instance;
  };
};

const sceneDefaultEvent = createSingle(() => ({
  mouseUp: fromEvent<MouseEvent>(document, "mouseup"),
  mouseMove: fromEvent<MouseEvent>(document, "mousemove"),
}));

// 导出
export const sceneMouseUp = () => {
  return {
    observable: sceneDefaultEvent().mouseUp,
  };
};

export const sceneMouseMove = () => {
  return {
    observable: sceneDefaultEvent().mouseMove,
  };
};
