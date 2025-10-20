import fs from "fs";
import path from "path";
import { simpleGit } from "simple-git";

const git = simpleGit();

async function main() {
  const srcDir = path.resolve("node_modules/lucide-static/icons");
  const destDir = path.resolve("icons");

  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    fs.copyFileSync(srcPath, destPath);
  }

  console.log(`✅ Скопировано ${files.length} иконок в /icons`);

  fs.writeFileSync(
    path.join(destDir, "index.json"),
    JSON.stringify(files, null, 2)
  );

  await git.add("./icons");
  await git.commit("chore: update lucide icons");
  await git.push();

  console.log("🚀 Иконки запушены в репозиторий");
}

main().catch((err) => {
  console.error("❌ Ошибка:", err);
  process.exit(1);
});
