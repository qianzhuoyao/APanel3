"use client";
import { useRef } from "react";
import { useCreatePermissionHandler } from "@repo/model";

export default function Page(): JSX.Element {
  const { setRef } = useCreatePermissionHandler();

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div ref={setRef} className="w-[200px] h-[200px]">
        1
      </div>
    </main>
  );
}
