import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base "./" keeps asset paths relative, so the same build works on
// GitHub Pages (/Portfolio/), a custom domain, or any static host.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: { target: "es2020", sourcemap: false },
});
