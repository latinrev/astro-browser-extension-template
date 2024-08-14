import { defineConfig } from "astro/config";
import ignoreFolders from "./build-tools/ignoreOnBuildPlugin";
import extractInlineIntegration from "./build-tools/extract-inline";

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: "never",
    format: "file",
  },
  integrations: [ignoreFolders(), extractInlineIntegration()],
});
