import interact from "interactjs";
import { INodeContent } from "../../Scene/type";
import { RefCallback } from "react";

export const BottomLeft = ({
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
    console.log(anchor, "anchoddr");
    if (anchor) {
      interact(anchor)
        .draggable({})
        .resizable({
          edges: {
            left: true,
            right: false,
            bottom: true,
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
      data-anchor="bottom-left"
      className="absolute w-[8px] h-[8px] bottom-0 left-0 translate-x-[-50%] translate-y-[50%] bg-[red] cursor-pointer"
    ></div>
  );
};
