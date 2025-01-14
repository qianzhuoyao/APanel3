"use client";
import { ReactView } from "@repo/view";

export default function Page(): JSX.Element {
  return (
    <main className="w-screen h-screen">
      <ReactView.Root className="w-full h-full" />
    </main>
  );
}
