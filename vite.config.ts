import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mochaPlugins } from "@getmocha/vite-plugins";

export default defineConfig({
  plugins: [...mochaPlugins(process.env as any), react()],
  server: {
    allowedHosts: true,
  },
  build: { 
    chunkSizeWarningLimit: 5000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
