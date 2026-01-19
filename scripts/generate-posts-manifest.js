const path = require("path");
const fs = require("fs");

const generateManifest = async () => {
  const { readSync } = await import("to-vfile");
  const { matter } = await import("vfile-matter");

  const directoryPath = path.resolve(".", "content/posts");
  const filePaths = fs.readdirSync(directoryPath);

  const promises = filePaths.map(async (file) => {
    const fullPath = path.resolve(".", "content/posts/", file);
    const stat = fs.statSync(fullPath);
    const fileContents = readSync(fullPath);
    matter(fileContents);

    return {
      slug: file.replace(".mdx", ""),
      lastModified: stat.mtime,
      frontmatter: fileContents.data.matter,
    };
  });

  const data = await Promise.all(promises);
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync("public/posts-manifest.json", json, "utf-8");
};

generateManifest();
