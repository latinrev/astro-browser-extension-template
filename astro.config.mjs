import { defineConfig } from "astro/config";
import { ignorePublicFolders, flattenBuildFolder } from "./build-tools/ignoreOnBuildPlugin";
import extractInlineIntegration from "./build-tools/extract-inline";

const ignoreFolders = () => {
  return {
    name: "ignore-on-public",
    hooks: {
      "astro:config:setup": ({ updateConfig, command }) => {
        if (command === "build") {
          updateConfig({
            /** @type {import('vite').UserConfig} */
            vite: {
              server: {
                ws: false,
                watch: null,
              },
              plugins: [ignorePublicFolders(), flattenBuildFolder()],
            },
          });
        }
      },
    },
  };
};

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: "never",
    format: "file",
  },
  integrations: [ignoreFolders(), extractInlineIntegration()],
});
