import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const campaignDir = join(root, "campaigns", "forte-brighton-east-2026");
const files = (await readdir(campaignDir))
  .filter((file) => file.endsWith(".json"))
  .sort();
const required = [
  "assets/sleep-choice/logo-white.png",
  "assets/forte/forte-logo.png",
  "Presented with",
  "$[UD:FIRST_NAME||]$",
  "David 0404 593 090",
  "Alex 0452 002 450",
  "The Sleep Choice x Supply Ministry Team",
  "$[LI:UNSUBSCRIBE]$",
  "$[LI:SUB_PREF]$",
  "padding:0 26px;background:#2c2758",
  "width:548px;max-width:548px",
  "border-bottom:2px solid #7353ba",
  "background:#eee2ff;color:#2c2758",
  "background:#f5f7f9",
  "letter-spacing:1.4px;color:#366382"
];

for (const file of files) {
  const campaign = JSON.parse(await readFile(join(campaignDir, file), "utf8"));
  if (!campaign.slug || !campaign.subject || !campaign.ctaUrl || !campaign.address) {
    throw new Error(`${file}: missing slug, subject, ctaUrl or address`);
  }
  const htmlFile = `${campaign.slug}.html`;
  const html = await readFile(join(campaignDir, htmlFile), "utf8");
  for (const value of required) {
    if (!html.includes(value)) throw new Error(`${htmlFile}: missing ${value}`);
  }
  if (!html.includes(campaign.ctaUrl)) throw new Error(`${htmlFile}: missing campaign CTA URL`);
  if (!html.includes(campaign.address)) throw new Error(`${htmlFile}: missing campaign address`);
  if (html.includes("—")) throw new Error(`${htmlFile}: contains an em dash`);
  if (/free lunch|lunch provided|lunch on us/i.test(html)) throw new Error(`${htmlFile}: contains an unapproved lunch claim`);
  if (/\{\{.+?\}\}/s.test(html)) throw new Error(`${htmlFile}: contains an unresolved renderer token`);
  if (!html.startsWith("<!doctype html>")) throw new Error(`${htmlFile}: invalid document start`);
}

console.log(`Validated ${files.length} campaigns against Sleep Choice 0926 requirements.`);
