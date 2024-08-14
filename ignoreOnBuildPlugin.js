import path from "path";
import fs from "fs-extra";

export function ignorePublicFolders() {
  return {
    name: "ignore-on-public",
    enforce: "pre",
    writeBundle(outputOptions, inputOptions) {
      const outDir = outputOptions.dir;
      const dirToExclude = path.resolve(outDir, process.env.EXCLUDE_DIR);
      fs.rm(dirToExclude, { recursive: true }, () => console.log(`Deleted ${dirToExclude}`));
    },
  };
}
export function flattenBuildFolder() {
  return {
    name: "flatten-on-build",
    async writeBundle(outputOptions) {
      const outDir = outputOptions.dir;
      if (!outDir) return;

      const browserFolders = ["v3", "v2"].filter((folder) => folder !== process.env.EXCLUDE_DIR);

      for (const browser of browserFolders) {
        const browserPath = path.join(outDir);

        // Check if the browser folder exists
        if (!(await fs.pathExists(browserPath))) continue;

        // Find the nested folder with the same name
        if (await fs.pathExists(browserPath)) {
          // Move contents of nested folder to parent
          const files = await fs.readdir(`${browserPath}/${browser}`);
          for (const file of files) {
            await fs.move(path.join(browserPath, browser, file), path.join(outDir, file), { overwrite: true });
          }
          // Remove the now empty nested folder
          await fs.remove(`${browserPath}/${browser}`);
        }
      }
    },
  };
}
