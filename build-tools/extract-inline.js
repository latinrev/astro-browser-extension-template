//Script comes from AminoffZ comment on Github https://github.com/withastro/roadmap/discussions/377#discussioncomment-7080997 -- Many thanks to AminoffZ for sharing this code snippet.
import glob from "tiny-glob";
import path from "path";
import fs from "fs/promises";

function hash(value) {
  let hash = 5381;
  let i = value.length;
  while (i) hash = (hash * 33) ^ value.charCodeAt(--i);
  return (hash >>> 0).toString(36);
}

export default function extractInlineIntegration() {
  return {
    name: "astro-extract-inline",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        console.log("Extracting Inline Scripts and Styles");
        const scriptRegx = /<script[^>]*>([\s\S]+?)<\/script>/g;
        const styleRegx = /<style[^>]*>([\s\S]+?)<\/style>/g;
        const normalizedPath = path.normalize(dir.pathname).substring(3);
        const files = await glob("**/*.html", {
          cwd: normalizedPath,
          filesOnly: true,
        });

        console.log(`Found ${files.length} files`);
        for (const file of files) {
          console.log(`Processing file: ${file}`);
          let content = await fs.readFile(path.join(normalizedPath, file), "utf-8");
          content = await extractAndReplace(content, scriptRegx, normalizedPath, "script", "js");
          content = await extractAndReplace(content, styleRegx, normalizedPath, "style", "css");
          await fs.writeFile(path.join(normalizedPath, file), content);
        }
      },
    },
  };
}

async function extractAndReplace(content, regex, directory, prefix, extension) {
  let match;
  while ((match = regex.exec(content)) !== null) {
    const inlineContent = match[1];
    const fileName = `/${prefix}-${hash(inlineContent)}.${extension}`;
    const filePath = path.join(directory, fileName);

    await fs.writeFile(filePath, inlineContent);
    console.log(`Inline ${prefix} extracted and saved at: ${filePath}`);

    const replacement =
      extension === "js" ? `<script type="module" src="${fileName}"></script>` : `<link rel="stylesheet" href="${fileName}" />`;

    content = content.replace(match[0], replacement);
  }
  return content;
}
