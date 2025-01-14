import { useEffect } from "react";

export const useWindowEvent = (
  event: string,
  callback: (e: any) => void,
  options?: boolean | AddEventListenerOptions
) => {
  useEffect(() => {
    window.addEventListener(event, callback, options);
    return () => {
      window.removeEventListener(event, callback, options);
    };
  }, [event, callback, options]);
};
