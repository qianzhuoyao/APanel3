import { Rxjs } from "@repo/lib";
import { useEffect } from "react";

export const useClickBody = (callback: () => void) => {
  useEffect(() => {
    const subscription = Rxjs.fromEvent(document.body, "mousedown")
      .pipe(
        Rxjs.tap(() => {
          callback();
        })
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);
};
