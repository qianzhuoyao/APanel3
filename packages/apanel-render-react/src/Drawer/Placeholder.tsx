import { CSSProperties, FC, ReactNode } from "react";

export interface IPlaceholder {
  emptyBlock: ReactNode;
}

export const Placeholder: FC<IPlaceholder> = ({ emptyBlock }) => {
  return <>{emptyBlock}</>;
};
