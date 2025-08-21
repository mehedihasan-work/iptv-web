import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2015", // downlevel for older engines
    rollupOptions: {
      output: {
        format: "iife", // bundle into one self-executing JS file
        entryFileNames: "bundle.js", // name of final script
        inlineDynamicImports: true,
      },
    },
  },
});
