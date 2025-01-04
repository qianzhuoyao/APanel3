import * as Rxjs from "rxjs";
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
