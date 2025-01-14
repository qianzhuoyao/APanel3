"use client";
import { ReactView } from "@repo/view";

export default function Page(): JSX.Element {
  return (
    <main className="h-screen w-screen">
      <ReactView.Root className="w-full h-full" />
    </main>
  );
}
