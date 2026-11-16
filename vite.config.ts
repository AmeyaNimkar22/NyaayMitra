import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    proxy: {
      // Legal Advisor RAG backend (legal-advisor/, FastAPI). Each module's
      // backend runs as its own process so one failing doesn't break others.
      "/api/advisor": {
        target: process.env.LEGAL_ADVISOR_URL || "http://127.0.0.1:8001",
        changeOrigin: true,
        // If the Legal Advisor backend is not running, answer 503 (instead of
        // Vite's generic 500) so the UI can show a "service unavailable" message.
        configure: (proxy) => {
          proxy.on("error", (_err, _req, res) => {
            if ("writeHead" in res && !res.headersSent) {
              res.writeHead(503, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ detail: "Legal Advisor backend is not reachable." }));
            }
          });
        },
      },
    },
  },
});
