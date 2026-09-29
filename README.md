# Dignitech campaign assets

Public, versioned HTML and image assets imported by Zoho Campaigns.

This repository contains public marketing content only. It must never contain
contacts, mailing lists, CRM exports, credentials, campaign performance data or
personal information.

## Production flow

1. Update the campaign JSON in `campaigns/`.
2. Run `npm run build`.
3. Run `npm test`.
4. Review the generated HTML at desktop and mobile widths.
5. Publish through GitHub Pages.
6. Create a Zoho Campaigns draft from the published HTML URL.
7. Validate the Zoho preview before describing the draft as ready.

Sending and scheduling remain user-controlled in Zoho Campaigns.
