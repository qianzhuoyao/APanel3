import { createSingle } from "@repo/lib";

export const handlerInstance = () => {
  return createSingle(() => {
    const node: Node | null = null;
    return {
      node,
    };
  });
};
