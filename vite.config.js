import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/CatastroVideojuegosCL",
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "dashes",
    },
  },
  envPrefix: "VITE_",
});
