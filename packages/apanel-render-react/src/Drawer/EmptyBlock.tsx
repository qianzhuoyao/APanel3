import { useMemo } from "react";
import { IBlock, ICustomBlockAttr } from "./type";
import cn from "clsx";

export const EmptyBlock = ({
  startX,
  startY,
  width,
  height,
  _style,
  className,
  attr,
}: IBlock & ICustomBlockAttr) => {
  const blockClass = useMemo(
    () =>
      `${cn(className)} absolute origin-top-left transform pointer-events-none`,
    [startX, startY, width, height, className]
  );

  const _attr = useMemo(() => JSON.stringify(attr), [attr]);

  return (
    <div
      data-attr={_attr}
      className={blockClass}
      style={{
        ..._style,
        width: width + "px",
        height: height + "px",
        transform: `translate(${startX}px, ${startY}px)`,
      }}
    ></div>
  );
};
