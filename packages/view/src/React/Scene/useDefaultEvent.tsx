import Moveable from "moveable";

export const useDefaultEvent = () => {
  const event = (movableRef: Moveable) => {
    movableRef.on("render", (e) => {
      e.target.style.transform = e.transform;
    });
    movableRef.on("dragOrigin", (e) => {
      e.target.style.transformOrigin = e.transformOrigin;
    });
    movableRef.on("resize", (e) => {
      e.target.style.width = `${e.width}px`;
      e.target.style.height = `${e.height}px`;
      e.target.style.transform = e.drag.transform;
    });
    movableRef.on("renderGroup", (e) => {
      e.events.forEach((ev) => {
        ev.target.style.transform = ev.transform;
      });
    });
  };
  return { event };
};
