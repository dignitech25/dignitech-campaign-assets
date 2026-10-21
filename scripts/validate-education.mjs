import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "campaigns", "ot-engagement-2026");
const required = [
  "https://dignitech25.github.io/dignitech-campaign-assets/assets/sleep-choice/logo-white.png",
  "$[UD:FIRST_NAME||]$", "David 0404 593 090", "Alex 0452 002 450",
  "The Sleep Choice x Supply Ministry Team", "sleepchoice.com.au",
  "$[LI:UNSUBSCRIBE]$", "$[LI:SUB_PREF]$", "2pm", "2am"
];
for (const file of (await readdir(dir)).filter(file => file.endsWith(".json"))) {
  const data = JSON.parse(await readFile(join(dir, file), "utf8"));
  const html = await readFile(join(dir, `${data.slug}.html`), "utf8");
  for (const value of required) if (!html.includes(value)) throw new Error(`${data.slug}.html: missing ${value}`);
  if (!html.startsWith("<!doctype html>")) throw new Error(`${data.slug}.html: invalid document start`);
  if (html.includes("—")) throw new Error(`${data.slug}.html: contains an em dash`);
  if (/\{\{.+?\}\}/s.test(html)) throw new Error(`${data.slug}.html: unresolved renderer token`);
}
console.log("Validated OT engagement campaigns against Sleep Choice 0926 requirements.");
