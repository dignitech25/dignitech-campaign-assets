import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "./render-campaign.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const directory = join(root, "campaigns", "ot-engagement-2026-10");
let count = 0;
for (const file of (await readdir(directory)).filter(name => name.endsWith(".json"))) {
  const data = JSON.parse(await readFile(join(directory, file), "utf8"));
  assert.equal(data.kind, "engagement", `${file}: invalid kind`);
  assert(!JSON.stringify(data).includes("—"), `${file}: em dash`);
  assert(!/\b(subject|preheader|intro|body|actionText)\b/.test(data.ctaLabel), `${file}: renderer label leaked`);
  assert(data.ctaUrl.startsWith("mailto:david@"), `${file}: expected one verified reply action`);
  if (data.brand !== "sleep-choice-0926") {
    assert.throws(() => render(data), /cannot render another brand/);
    continue;
  }
  const html = await readFile(join(directory, `${data.slug}.html`), "utf8");
  for (const value of ["assets/sleep-choice/logo-white.png", "$[UD:FIRST_NAME||]$", "David 0404 593 090", "Alex 0452 002 450", "The Sleep Choice x Supply Ministry Team", "$[LI:UNSUBSCRIBE]$", "$[LI:SUB_PREF]$", "width:548px;max-width:548px", "border-bottom:2px solid #7353ba", data.ctaUrl.replaceAll("&", "&amp;")]) assert(html.includes(value), `${file}: missing ${value}`);
  assert(!/Presented with|forte-logo|Forté|21 October|Brighton East|undefined|\{\{/.test(html), `${file}: stale event or unresolved field`);
  assert(!html.includes("—"), `${file}: em dash`);
  assert(html.startsWith("<!doctype html>"));
  assert(html.includes('max-width:620px'));
  count += 1;
}
assert.equal(count, 3, "Expected three distinct Sleep Choice relationship variants");
console.log(`Validated ${count} non-event Sleep Choice campaigns and rejected cross-brand rendering.`);
