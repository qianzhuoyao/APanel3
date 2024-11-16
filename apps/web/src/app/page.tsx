"use client";
import { useEffect, useRef } from "react";
import { Handler } from "@repo/model";

export default function Page(): JSX.Element {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      const h = Handler.createDefaultPermissionHandler({
        node: itemRef.current,
        selected: true,
      });

      return () => {
        h.handler.remove();
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
