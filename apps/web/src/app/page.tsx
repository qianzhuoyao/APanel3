"use client";

import {
  useCreatePermissionHandler,
  PERMISSION_HANDLER,
  drawer,
} from "@repo/model";
import { useEffect } from "react";

export default function Page(): JSX.Element {
  const Handler = useCreatePermissionHandler();
  useEffect(() => {
    const s = drawer();
    return () => {
      s.unsubscribe();
    };
  }, []);
  Handler.setHandler((h) => {
    const p = h?.handler
      .addEventListener("click", () => {
        console.log("click");
      })
      .addDragEventListener("dragStart", () => {
        console.log("start");
      })
      .addDragEventListener("dragRunning", () => {
        console.log("dragRunning");
      })
      .addDragEventListener("dragFinish", () => {
        console.log(p, "dragFinish");
        // p.setNodePermission(per=>
        //  per ^ PERMISSION_HANDLER.DRAGGABLE
        // );
      })
      .addResizeEventListener("resizeStart", (e, p) => {
        console.log(p, "resizeStart");
      })
      .addResizeEventListener("resizeRunning", (e, p) => {
        console.log(p, "resizeRunning");
      })
      .addResizeEventListener("resizeFinish", (e, p) => {
        console.log(p, "resizeFinish");
      });
  });
  // console.log(Handler.getHandler());
  // handlerRef.current.h?.handler.addEventListener("click", () => {
  //   console.log("click");
  // });

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div ref={Handler.setRef} className="w-[200px] h-[200px]">
        1
      </div>
    </main>
  );
}
