import { CSSProperties } from "react";
import { EmptyBlock } from "../Drawer/EmptyBlock";
import { IBlock } from "../Drawer/type";

export const useCreateEmptyBlock = (style: IBlock) => {
  return (
    className: string,
    _style: CSSProperties,
    attr: Record<string, string>
  ) => (
    <EmptyBlock
      {...{
        _style,
        attr,
        className,
        ...style,
      }}
    ></EmptyBlock>
  );
};
