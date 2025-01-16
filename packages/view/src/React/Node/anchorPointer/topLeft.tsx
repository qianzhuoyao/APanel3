import interact from "interactjs";
import { RefCallback } from "react";

export const TopLeft = ({
  showAnchor,
  updatedPosition,
  updatePosition,
}: {
  showAnchor: boolean;
  updatedPosition: () => void;
  updatePosition: (position: {
    x: number;
    y: number;
    dx: number;
    dy: number;
  }) => void;
}) => {
  const anchorRef: RefCallback<HTMLDivElement> = (anchor) => {
    if (anchor) {
      interact(anchor)
        .draggable({})
        .resizable({
          edges: {
            left: true,
            right: false,
            bottom: false,
            top: true,
          },

          listeners: {
            end() {
              //更新tree
              updatedPosition();
            },
            move(event) {
              updatePosition({
                dx: event.dx,
                dy: event.dy,
                x: event.delta.x,
                y: event.delta.y,
              });
            },
          },
        });
    }
  };

  return (
    <div
      ref={anchorRef}
      style={{
        visibility: showAnchor ? "visible" : "hidden",
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      data-anchor="top-left"
      className="absolute w-[8px] h-[8px] top-0 left-0 translate-x-[-50%] translate-y-[-50%] bg-[red] cursor-pointer"
    ></div>
  );
};
