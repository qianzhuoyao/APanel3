"use client";

import { Scene } from "@repo/view/React";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <Scene
        style={{ width: "500px", height: "300px", border: "1px solid gray" }}
      />
    </main>
  );
}
