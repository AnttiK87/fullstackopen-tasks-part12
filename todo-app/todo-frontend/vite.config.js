import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "./",
  build: {
    outDir: "dist",
  },
  server: {
    allowedHosts: ["app"],
    watch: { usePolling: true },
    port: 5173,
  },

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./testSetup.js",
  },
});
