import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    root: resolve(import.meta.dirname, "src"),

    envDir: resolve(import.meta.dirname),

    build: {
        outDir: resolve(import.meta.dirname, "dist"),

        rollupOptions: {
            input: {
                main: resolve(import.meta.dirname, "src/index.html"),
                planets: resolve(import.meta.dirname, "src/planets/index.html"),
                search: resolve(import.meta.dirname, "src/search/index.html"),
                gallery: resolve(import.meta.dirname, "src/gallery/index.html"),
                favorites: resolve(import.meta.dirname, "src/favorites/index.html"),
            },
        },
    },
});
