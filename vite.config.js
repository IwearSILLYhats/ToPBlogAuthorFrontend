import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const root = path.resolve(import.meta.dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": root,
    },
  },
  plugins: [react()],
});
