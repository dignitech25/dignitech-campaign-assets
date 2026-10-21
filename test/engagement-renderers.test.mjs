import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { render } from "../scripts/render-campaign.mjs";
import { renderSupplyEngagement, checkSupplyHtml } from "../scripts/render-supply-engagement.mjs";

const directory = new URL("../campaigns/ot-engagement-2026-10/", import.meta.url);
const sleepSlugs = ["sleep-choice-night-time-routine", "sleep-choice-revisit-the-question", "sleep-choice-start-with-the-routine"];
const supplySlugs = ["supply-ministry-connected-decisions", "supply-ministry-reopen-the-brief", "supply-ministry-one-practical-brief"];
const spec = async slug => JSON.parse(await readFile(new URL(`${slug}.json`, directory), "utf8"));

for (const slug of sleepSlugs) test(`Sleep Choice output is current, branded and non-event: ${slug}`, async () => {
  const data = await spec(slug);
  const html = await readFile(new URL(`${slug}.html`, directory), "utf8");
  assert.equal(html, render(data));
  assert(!/Presented with|forte-logo|Forté|undefined|<script\b|—/.test(html));
  assert(html.includes("$[LI:UNSUBSCRIBE]$"));
});
for (const slug of supplySlugs) test(`Supply Ministry output is current and separately branded: ${slug}`, async () => {
  const data = await spec(slug);
  const html = await readFile(new URL(`${slug}.html`, directory), "utf8");
  assert.equal(html, renderSupplyEngagement(data));
  assert.equal(checkSupplyHtml(html, data).checks, 20);
  assert.throws(() => render(data), /cannot render another brand/);
});
test("Supply Ministry refuses another sender, unsafe filenames and em dashes", async () => {
  const data = await spec(supplySlugs[0]);
  assert.throws(() => renderSupplyEngagement({ ...data, ctaUrl: "mailto:unverified@example.com" }), /Unverified/);
  assert.throws(() => renderSupplyEngagement({ ...data, slug: "../another-file" }), /Invalid output slug/);
  assert.throws(() => renderSupplyEngagement({ ...data, subject: "Not permitted — punctuation" }), /Em dash/);
});
test("Both renderers escape supplied copy rather than execute HTML", async () => {
  const value = '<script>alert("test")</script>';
  const sleep = render({ ...await spec(sleepSlugs[0]), intro: [value] });
  const supply = renderSupplyEngagement({ ...await spec(supplySlugs[0]), intro: [value] });
  for (const html of [sleep, supply]) {
    assert(!html.includes("<script>"));
    assert(html.includes("&lt;script&gt;"));
  }
});
