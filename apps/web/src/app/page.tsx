"use client";

import { Provider } from "@repo/view/React";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <Provider />
    </main>
  );
}
