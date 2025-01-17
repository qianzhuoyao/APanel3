import { RefCallback } from "react";
import { INodeContent } from "../../Scene/type";
import interact from "interactjs";

export const BottomCenter = ({
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
            left: false,
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
              updatePosition(event);
            },
          },
        });
    }
  };

  return (
    <div
      ref={anchorRef}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      style={{
        visibility: showAnchor ? "visible" : "hidden",
      }}
      data-anchor="bottom-center"
      className="absolute w-[8px] h-[8px] bottom-0 left-[50%] translate-x-[50%] translate-y-[50%] bg-[red] cursor-pointer"
    ></div>
  );
};
