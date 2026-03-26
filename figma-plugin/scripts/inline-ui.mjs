import { readFile, writeFile } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const htmlPath = resolve(root, "src", "ui.html");
const jsPath = resolve(root, "ui.js");
const outPath = resolve(root, "ui.html");

const html = await readFile(htmlPath, "utf8");
const js = await readFile(jsPath, "utf8");

const marker = "<!-- UI_SCRIPT -->";
if (!html.includes(marker)) {
  throw new Error("UI_SCRIPT marker not found in src/ui.html");
}

const out = html.replace(marker, `<script>\n${js}\n</script>`);
await writeFile(outPath, out, "utf8");
