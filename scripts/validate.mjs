import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const campaignDir = join(root, "campaigns", "forte-brighton-east-2026");
const files = ["wave-1-relationship-ots.html", "wave-2-verified-new-ots.html"];
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
  "fortehealthcare.com.au/event/sleep-choice-brighton-east-ot-cpd-training/",
  "351 Nepean Highway, Brighton East",
  "padding:0 26px;background:#2c2758",
  "width:548px;max-width:548px",
  "border-bottom:2px solid #7353ba",
  "background:#eee2ff;color:#2c2758",
  "background:#f5f7f9",
  "letter-spacing:1.4px;color:#366382"
];

for (const file of files) {
  const html = await readFile(join(campaignDir, file), "utf8");
  for (const value of required) {
    if (!html.includes(value)) throw new Error(`${file}: missing ${value}`);
  }
  if (html.includes("—")) throw new Error(`${file}: contains an em dash`);
  if (/\{\{.+?\}\}/s.test(html)) throw new Error(`${file}: contains an unresolved renderer token`);
  if (!html.startsWith("<!doctype html>")) throw new Error(`${file}: invalid document start`);
}

console.log(`Validated ${files.length} campaigns against Sleep Choice 0926 requirements.`);
