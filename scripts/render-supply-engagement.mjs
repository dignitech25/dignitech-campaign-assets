import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const campaignDir = join(root, "campaigns", "ot-engagement-2026-10");

export const supplyLogoUrl = "https://stratus.campaign-image.com.au/images/37824000000791004_zc_v1_1777946397668_sm___inverted_(1).png";
const colours = {
  purple: "#3d2d9e",
  navy: "#1c1c75",
  sand: "#f4efe6",
  ink: "#1c1c1c",
  white: "#ffffff"
};

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const paragraph = (value) => `<p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.6;color:${colours.ink};text-align:left;">${escapeHtml(value)}</p>`;

export function validateSupplySpec(data) {
  if (data.kind !== "engagement" || data.brand !== "supply-ministry-review") {
    throw new Error("Supply Ministry review engagement specification required");
  }
  for (const key of ["slug", "subject", "preheader", "sectionTitle", "actionTitle", "actionText", "ctaLabel", "ctaUrl"]) {
    if (typeof data[key] !== "string" || !data[key].trim()) throw new Error(`Missing ${key}`);
  }
  for (const key of ["intro", "body"]) {
    if (!Array.isArray(data[key]) || !data[key].length || data[key].some((part) => typeof part !== "string" || !part.trim())) {
      throw new Error(`Non-empty ${key} paragraphs required`);
    }
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) throw new Error("Invalid output slug");
  if (!/^mailto:david@supplyministry\.com\.au(?:\?[^\s]*)?$/.test(data.ctaUrl)) throw new Error("Unverified CTA mailbox");
  if (JSON.stringify(data).includes("\u2014")) throw new Error("Em dash is not permitted");
  return data;
}

export function renderSupplyEngagement(input) {
  const data = validateSupplySpec(input);
  const intro = data.intro.map(paragraph).join("\n");
  const body = data.body.map(paragraph).join("\n");
  return `<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>${escapeHtml(data.subject)}</title>
  <style>
    @media only screen and (max-width:620px){
      .email-shell{width:100%!important;max-width:100%!important}
      .outer-pad{padding:12px 0!important}
      .content-pad{padding-left:22px!important;padding-right:22px!important}
      .brand-logo{width:100%!important;height:auto!important}
      .cta-table{width:100%!important}
      .cta{display:block!important;width:100%!important;box-sizing:border-box!important}
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${colours.white};font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${escapeHtml(data.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:${colours.white};border-collapse:collapse;">
    <tr>
      <td class="outer-pad" align="center" style="padding:30px 0;">
        <table role="presentation" class="email-shell" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px;max-width:600px;background:${colours.white};border-collapse:collapse;">
          <tr>
            <td align="center" bgcolor="${colours.purple}" style="padding:7px 15px;background:${colours.purple};">
              <img class="brand-logo" src="${supplyLogoUrl}" width="570" alt="Supply Ministry" style="display:block;width:570px;max-width:100%;height:auto;border:0;">
            </td>
          </tr>
          <tr>
            <td class="content-pad" style="padding:28px 30px 10px;background:${colours.white};">
              <p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.6;color:${colours.ink};">Hi $[UD:FIRST_NAME||]$,</p>
              ${intro}
            </td>
          </tr>
          <tr>
            <td class="content-pad" style="padding:20px 30px;background:${colours.sand};">
              <h2 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.3;color:${colours.ink};">${escapeHtml(data.sectionTitle)}</h2>
            </td>
          </tr>
          <tr>
            <td class="content-pad" style="padding:24px 30px 6px;background:${colours.white};">
              ${body}
            </td>
          </tr>
          <tr>
            <td class="content-pad" style="padding:22px 30px 28px;background:${colours.sand};">
              <h2 style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:1.3;color:${colours.ink};">${escapeHtml(data.actionTitle)}</h2>
              ${paragraph(data.actionText)}
              <table role="presentation" class="cta-table" cellspacing="0" cellpadding="0" border="0" style="max-width:100%;border-collapse:separate;">
                <tr>
                  <td align="center" bgcolor="${colours.navy}" style="background:${colours.navy};border-radius:5px;">
                    <a class="cta" href="${escapeHtml(data.ctaUrl)}" style="display:inline-block;max-width:100%;padding:16px 22px;font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.4;font-weight:bold;white-space:normal;overflow-wrap:break-word;text-align:center;text-decoration:none;color:${colours.white};background:${colours.navy};border-radius:5px;box-sizing:border-box;">${escapeHtml(data.ctaLabel)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="content-pad" align="center" style="padding:26px 30px;background:${colours.white};color:${colours.ink};">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Best regards,<br><strong>Alex and David</strong></p>
              <p style="margin:0;font-size:16px;line-height:1.6;">David <a href="tel:+61404593090" style="color:${colours.ink};text-decoration:underline;">0404 593 090</a></p>
              <p style="margin:0 0 12px;font-size:16px;line-height:1.6;">Alex <a href="tel:+61452002450" style="color:${colours.ink};text-decoration:underline;">0452 002 450</a></p>
              <p style="margin:0;font-size:16px;line-height:1.6;overflow-wrap:break-word;"><a href="mailto:david@supplyministry.com.au" style="color:${colours.ink};text-decoration:underline;">david@supplyministry.com.au</a></p>
              <p style="margin:0;font-size:16px;line-height:1.6;overflow-wrap:break-word;"><a href="mailto:alex@supplyministry.com.au" style="color:${colours.ink};text-decoration:underline;">alex@supplyministry.com.au</a></p>
            </td>
          </tr>
          <tr>
            <td class="content-pad" align="center" style="padding:20px 30px 24px;background:${colours.sand};color:${colours.ink};">
              <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:${colours.ink};">Would you like to change how you receive these emails?</p>
              <p style="margin:0;font-size:14px;line-height:1.6;color:${colours.ink};"><a href="http://$[LI:SUB_PREF]$" style="color:${colours.ink};text-decoration:underline;font-weight:bold;">Update your preferences</a> or <a href="http://$[LI:UNSUBSCRIBE]$" style="color:${colours.ink};text-decoration:underline;font-weight:bold;">unsubscribe from this mailing list</a>.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export function checkSupplyHtml(html, data) {
  const required = [supplyLogoUrl, escapeHtml(data.subject), escapeHtml(data.preheader), escapeHtml(data.ctaUrl),
    "$[UD:FIRST_NAME||]$", "$[LI:UNSUBSCRIBE]$", "$[LI:SUB_PREF]$",
    "Best regards,", "Alex and David", "0404 593 090", "0452 002 450",
    "david@supplyministry.com.au", "alex@supplyministry.com.au", colours.purple, colours.sand, colours.navy];
  for (const value of required) if (!html.includes(value)) throw new Error(`Missing HTML requirement: ${value}`);
  if (/\bSleep Choice\b|fort[eé]|<script\b|undefined|\u2014/i.test(html)) throw new Error("Unexpected brand, script or invalid content in Supply Ministry HTML");
  if ((html.match(/<img\b/gi) || []).length !== 1) throw new Error("Expected only the verified Supply Ministry logo");
  if (!html.includes("@media only screen and (max-width:620px)")) throw new Error("Missing mobile rules");
  const tables = (html.match(/<table\b/gi) || []).length;
  if (tables !== (html.match(/<\/table>/gi) || []).length) throw new Error("Unbalanced layout tables");
  return { checks: required.length + 4, tables };
}

async function main() {
  let rendered = 0;
  for (const filename of (await readdir(campaignDir)).filter((name) => name.endsWith(".json")).sort()) {
    const data = JSON.parse(await readFile(join(campaignDir, filename), "utf8"));
    if (data.brand !== "supply-ministry-review") continue;
    if (filename !== `${data.slug}.json`) throw new Error(`Specification name/slug mismatch: ${filename}`);
    const html = renderSupplyEngagement(data);
    const result = checkSupplyHtml(html, data);
    await writeFile(join(campaignDir, `${data.slug}.html`), html);
    console.log(`${data.slug}.html: ${result.checks} source checks passed`);
    rendered += 1;
  }
  if (rendered !== 3) throw new Error(`Expected 3 Supply Ministry review outputs, found ${rendered}`);
  console.log("Review HTML only. Visual acceptance, postal-address confirmation and audience clearance remain required before send readiness.");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) await main();
