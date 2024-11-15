"use client";
import { useEffect, useRef } from "react";
import { Handler } from "@repo/model";

export default function Page(): JSX.Element {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      const handler = Handler.handler({
        node: itemRef.current,
      });
      const dragObj = Handler.createDragEvent(itemRef.current);
      const resizeObj = Object.keys(handler.pointer).map((key) => {
        return Handler.createResizeEvent(handler.pointer[key]).observable;
      });
      console.log(resizeObj, "resizeObj");
     
      handler.setSelected(true);
      handler.addEventListener("click", () => {
        // handler.setSelected(!handler.isSelected());
      });
      return () => {
        handler.remove();
        // dragObj.subscription.unsubscribe();
      };
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div ref={itemRef} className="w-[200px] h-[200px]">
        1
      </div>
    </main>
  );
}
