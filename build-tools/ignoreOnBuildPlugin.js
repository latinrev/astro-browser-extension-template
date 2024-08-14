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
        // Check if the browser folder exists
        if (!(await fs.pathExists(outDir))) continue;

        // Find the nested folder with the same name
        if (await fs.pathExists(outDir)) {
          // Move contents of nested folder to parent3
          const files = await fs.readdir(`${outDir}/${browser}`);
          for (const file of files) {
            await fs.move(path.join(outDir, browser, file), path.join(outDir, file), { overwrite: true });
          }
        }
      }
    },
  };
}
