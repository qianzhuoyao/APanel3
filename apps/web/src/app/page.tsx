"use client";

import { useCreatePermissionHandler } from "@repo/model";

export default function Page(): JSX.Element {
  const Handler = useCreatePermissionHandler();

  Handler.setHandler((h) => {
    h?.handler.addEventListener("click", () => {
      console.log("click");
    });

    h?.handler.addDragEventListener("dragStart", () => {
      console.log("start");
    });

    h?.handler.addDragEventListener("dragRunning", () => {
      console.log("dragRunning");
    });

    h?.handler.addDragEventListener("dragFinish", () => {
      console.log("dragFinish");
    });

    h?.handler.addResizeEventListener("resizeStart", (e, p) => {
      console.log(p, "resizeStart");
    });

    h?.handler.addResizeEventListener("resizeRunning", (e, p) => {
      console.log(p, "resizeRunning");
    });

    h?.handler.addResizeEventListener("resizeFinish", (e, p) => {
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
