import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const campaignDir = join(root, "campaigns", "forte-brighton-east-2026");
const logoUrl = "https://dignitech25.github.io/dignitech-campaign-assets/assets/sleep-choice/logo-white.png";
const forteLogoUrl = "https://dignitech25.github.io/dignitech-campaign-assets/assets/forte/forte-logo.png";
const design = {
  navy: "#2c2758",
  purple: "#7353ba",
  lavender: "#eee2ff",
  white: "#ffffff",
  ink: "#111111",
  forteBlue: "#366382",
  forteDarkBlue: "#244a67",
  forteMauve: "#775673",
  forteGround: "#f5f7f9",
  forteMauveGround: "#f3edf2"
};

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const paragraph = (value) => `<p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.55;color:${design.ink};text-align:center;">${escapeHtml(value)}</p>`;

function render(data) {
  const intro = data.intro.map(paragraph).join("");
  const body = data.body.map(paragraph).join("");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(data.subject)}</title>
  <style>
    @media only screen and (max-width:620px){.email-shell{width:100%!important}.pad{padding-left:20px!important;padding-right:20px!important}.logo{width:100%!important;height:auto!important}.button{width:100%!important;box-sizing:border-box!important}.desktop-break{display:none!important}}
  </style>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(data.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#ffffff;border-collapse:collapse;">
    <tr>
      <td align="center" style="padding:40px 0;background:#ffffff;">
        <table role="presentation" class="email-shell" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px;max-width:600px;background:${design.navy};border:3px solid ${design.purple};border-collapse:collapse;">
          <tr>
            <td align="center" style="padding:7px 15px;background:#2c2758;">
              <img class="logo" src="${logoUrl}" width="570" alt="Sleep Choice. Try, Sleep, Decide." style="display:block;width:570px;max-width:100%;height:auto;border:0;">
            </td>
          </tr>
          <tr>
            <td class="pad" align="center" style="padding:15px 34px 16px;background:${design.forteGround};border-top:3px solid ${design.purple};border-bottom:3px solid ${design.forteBlue};">
              <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.3;font-weight:bold;letter-spacing:1.4px;color:${design.forteDarkBlue};text-transform:uppercase;">Presented with</p>
              <img src="${forteLogoUrl}" width="180" alt="Forté Healthcare" style="display:block;width:180px;max-width:52%;height:auto;border:0;">
            </td>
          </tr>
          <tr>
            <td class="pad" style="padding:24px 34px 20px;background:${design.white};">
              <p style="margin:0 0 24px;font-size:17px;line-height:1.55;text-align:center;color:#111111;">Hi $[UD:FIRST_NAME||]$,</p>
              ${intro}
            </td>
          </tr>
          <tr>
            <td class="pad" align="center" style="padding:20px 34px;background:${design.forteGround};border-top:3px solid ${design.forteBlue};border-bottom:3px solid ${design.forteBlue};">
              <h2 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;color:${design.forteDarkBlue};">${escapeHtml(data.sectionTitle)}</h2>
            </td>
          </tr>
          <tr>
            <td class="pad" style="padding:24px 34px 8px;background:#ffffff;">
              ${body}
            </td>
          </tr>
          <tr>
            <td class="pad" align="center" style="padding:20px 34px;background:${design.forteMauveGround};border-top:3px solid ${design.forteMauve};border-bottom:3px solid ${design.forteMauve};">
              <h2 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;color:${design.forteMauve};">${escapeHtml(data.eventTitle)}</h2>
            </td>
          </tr>
          <tr>
            <td class="pad" align="center" style="padding:24px 34px 30px;background:#ffffff;">
              <p style="margin:0 0 4px;font-size:17px;line-height:1.5;color:#111111;"><strong>${escapeHtml(data.date)}</strong></p>
              <p style="margin:0 0 22px;font-size:17px;line-height:1.5;color:#111111;">${escapeHtml(data.time)}</p>
              <p style="margin:0 0 4px;font-size:17px;line-height:1.5;color:#111111;"><strong>${escapeHtml(data.venue)}</strong></p>
              <p style="margin:0 0 22px;font-size:17px;line-height:1.5;color:#111111;">${escapeHtml(data.address)}</p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:#111111;">${escapeHtml(data.detail)}</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;">
                <tr>
                  <td align="center" bgcolor="#2c2758" style="border-radius:36px;">
                    <a class="button" href="${escapeHtml(data.ctaUrl)}" target="_blank" style="display:inline-block;width:330px;padding:15px 18px;font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:1.2;font-weight:bold;color:#ffffff;text-decoration:none;background:#2c2758;border:2px solid ${design.purple};border-radius:36px;box-sizing:border-box;">${escapeHtml(data.ctaLabel)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="pad" align="center" style="padding:20px 34px 24px;background:#2c2758;color:#ffffff;border-top:3px solid ${design.purple};">
              <p style="margin:0 0 18px;font-size:16px;line-height:1.5;color:#ffffff;">Warm regards,</p>
              <p style="margin:0;font-size:16px;line-height:1.5;color:#ffffff;"><strong>David 0404 593 090</strong></p>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.5;color:#ffffff;"><strong>Alex 0452 002 450</strong></p>
              <p style="margin:0;font-size:16px;line-height:1.5;color:#ffffff;"><strong>The Sleep Choice x Supply Ministry Team</strong></p>
              <p style="margin:0 0 20px;font-size:16px;line-height:1.5;"><a href="https://www.sleepchoice.com.au" target="_blank" style="color:#ffffff;text-decoration:underline;">sleepchoice.com.au</a></p>
              <p style="margin:0;font-size:15px;line-height:1.5;color:#ffffff;"><em>Note: NDIS and Aged Care packages typically do not fund equipment trials. Sleep Choice covers the 7-day in-home trial at no cost to the participant.</em></p>
              <p style="margin:0 0 22px;font-size:15px;line-height:1.5;color:#ffffff;"><em>(service area limits apply)</em></p>
            </td>
          </tr>
          <tr>
            <td class="pad" align="center" style="padding:16px 34px 18px;background:${design.lavender};color:${design.navy};border-top:3px solid ${design.purple};">
              <p style="margin:0;font-size:14px;line-height:1.5;color:${design.navy};">Want to change how you receive these emails?</p>
              <p style="margin:0;font-size:14px;line-height:1.5;color:${design.navy};">You can <a href="http://$[LI:UNSUBSCRIBE]$" target="_blank" style="color:${design.navy}!important;text-decoration:underline;font-weight:bold;">Unsubscribe</a> or <a href="http://$[LI:SUB_PREF]$" target="_blank" style="color:${design.navy}!important;text-decoration:underline;font-weight:bold;">Update your preferences</a>.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

for (const file of ["wave-1.json", "wave-2.json"]) {
  const data = JSON.parse(await readFile(join(campaignDir, file), "utf8"));
  await writeFile(join(campaignDir, `${data.slug}.html`), render(data));
}
