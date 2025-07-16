"use client";
import { useApanel } from "@repo/apanel-render-react";

export default function Page(): JSX.Element {
  const { setSceneRef, placeholder } = useApanel();
  return (
    <main className="h-screen w-screen">
      <div ref={setSceneRef} className="w-full h-full">
        {placeholder("", { background: "red" }, {})}
      </div>
    </main>
  );
}
