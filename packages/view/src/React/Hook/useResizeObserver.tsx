import { useState, useEffect, useRef, useCallback } from "react";

type Size = {
  width: number;
  height: number;
};


/**
 * useResizeObserver
 * @returns   {size: Size | undefined, ref: (node: T | null) => void}
 */
export const useResizeObserver = <T extends HTMLElement>() => {
  const [size, setSize] = useState<Size | undefined>();
  const targetRef = useRef<T | null>(null);

  const setTargetRef = useCallback((node: T | null) => {
    targetRef.current = node;
  }, []);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect) {
          setSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }
    });

    resizeObserver.observe(target);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { size, ref: setTargetRef };
};
