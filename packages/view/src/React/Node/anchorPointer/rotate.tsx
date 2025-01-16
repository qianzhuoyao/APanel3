import interact from "interactjs";
import { RefCallback } from "react";
import { INodeContent } from "../../Scene/type";

export const Rotate = ({
  showAnchor,
  updatedAngle,
  startUpdateAngle,
  updateAngle,
}: {
  showAnchor: boolean;
  updatedAngle: () => void;
  startUpdateAngle: (event: any) => void;
  updateAngle: (event: any) => void;
}) => {
  const anchorRef: RefCallback<HTMLDivElement> = (anchor) => {
    if (anchor) {
      interact(anchor).draggable({
        // enable inertial throwing
        inertia: false,
        listeners: {
          start(event) {
            console.log("start");
            startUpdateAngle(event);
          },
          end() {
            //更新tree
            updatedAngle();
          },
          move(event) {
            updateAngle(event);
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
      data-anchor="rotate"
      className="absolute w-[8px] h-[8px] -top-4 left-[50%] translate-x-[-50%] bg-[red] cursor-pointer"
    ></div>
  );
};
