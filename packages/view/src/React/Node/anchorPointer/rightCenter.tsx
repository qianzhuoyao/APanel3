import { RefCallback } from "react";
import { INodeContent } from "../../Scene/type";
import interact from "interactjs";

export const RightCenter = ({
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
            left: false,
            right: true,
            bottom: false,
            top: false,
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
      data-anchor="right-center"
      className="absolute w-[8px] h-[8px] top-[50%] right-0 translate-x-[50%] translate-y-[-50%] bg-[red] cursor-pointer"
    ></div>
  );
};
