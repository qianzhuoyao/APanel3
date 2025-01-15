import interact from "interactjs";
import { INodeContent } from "../../Scene/type";
import { RefCallback } from "react";

export const BottomRight = ({
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
      data-anchor="bottom-right"
      className="absolute w-[8px] h-[8px] bottom-0 right-0 translate-x-[50%] translate-y-[50%] bg-[red] cursor-pointer"
    ></div>
  );
};
