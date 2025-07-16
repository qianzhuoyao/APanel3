import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import { nextui } from "@nextui-org/react";

const config: Pick<
  Config,
  "presets" | "content" | "darkMode" | "plugins" | "theme"
> = {
  content: [
    "./src/React/**/*.{tsx,ts}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [nextui()],
  presets: [sharedConfig],
  theme: {
    extend: {
      fontSize: {
        base: "14px", // 设置默认字体大小为 14px
      },
      colors: {
        buttonLock: "#ffffff",
        buttonUnlock: "#000000",
      },
    },
  },
};

export default config;
