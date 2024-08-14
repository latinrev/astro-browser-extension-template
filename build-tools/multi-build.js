import { spawn } from "child_process";

const builds = [
  { outDir: "v2", ignore: "v3" },
  { outDir: "v3", ignore: "v2" },
];

function runBuild(build) {
  return new Promise((resolve, reject) => {
    console.log(`Building for ${build.outDir}...`);
    const process = spawn(`npx cross-env EXCLUDE_DIR=${build.ignore}  astro build --outDir dist/${build.outDir}`, {
      stdio: "inherit",
      shell: true,
      env: { ...build.env },
    });

    process.on("close", (code) => {
      if (code === 0) {
        console.log(`Build for ${build.outDir} completed successfully.`);
        resolve();
      } else {
        console.error(`Build for ${build.outDir} failed with code ${code}`);
        reject(new Error(`Build process exited with code ${code}`));
      }
    });
  });
}

async function runBuildsInParallel() {
  try {
    await Promise.all(builds.map(runBuild));
    console.log("All builds completed successfully!");
  } catch (error) {
    console.error(`Error during build: ${error.message}`);
    process.exit(1);
  }
}

runBuildsInParallel();
