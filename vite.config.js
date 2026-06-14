import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  base: "/arduinohatesme/",
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
});
