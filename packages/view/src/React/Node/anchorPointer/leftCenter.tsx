import { RefCallback } from "react";
import { INodeContent } from "../../Scene/type";
import interact from "interactjs";

export const LeftCenter = ({
  showAnchor,
  updatedPosition,
  updatePosition,
}: {
  showAnchor: boolean;

  updatedPosition: () => void;
  updatePosition: (event: any) => void;
}) => {
  const anchorRef: RefCallback<HTMLDivElement> = (anchor) => {
    if (anchor) {
      interact(anchor)
        .styleCursor(false)
        .draggable({})
        .resizable({
          edges: {
            left: true,
            right: false,
            bottom: false,
            top: false,
          },

          listeners: {
            end() {
              //更新tree
              updatedPosition();
            },
            move(event) {
              updatePosition(event);
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
      data-anchor="left-center"
      className="absolute w-[8px] h-[8px] top-[50%] left-0 translate-x-[-50%] translate-y-[-50%] bg-[red] cursor-pointer"
    ></div>
  );
};
