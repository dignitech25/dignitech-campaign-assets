import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "./render-campaign.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const directory = join(root, "campaigns", "ot-engagement-2026-10");
const files = (await readdir(directory)).filter(name => name.endsWith(".json")).sort();
let rendered = 0;
for (const file of files) {
  const data = JSON.parse(await readFile(join(directory, file), "utf8"));
  // Supply Ministry copy remains in its own brand workflow, never a Sleep Choice skin.
  if (data.brand !== "sleep-choice-0926") continue;
  if (data.kind !== "engagement") throw new Error(`${file}: not an engagement campaign`);
  for (const field of ["slug", "subject", "preheader", "sectionTitle", "actionTitle", "actionText", "ctaLabel", "ctaUrl", "trialFooterText"]) {
    if (typeof data[field] !== "string" || !data[field].trim()) throw new Error(`${file}: missing ${field}`);
  }
  if (!/^[a-z0-9-]+$/.test(data.slug)) throw new Error(`${file}: invalid slug`);
  if (!data.intro?.length || !data.body?.length) throw new Error(`${file}: missing copy`);
  await writeFile(join(directory, `${data.slug}.html`), render(data));
  rendered += 1;
}
console.log(`Rendered ${rendered} Sleep Choice engagement campaigns. Other-brand copy not rendered.`);
